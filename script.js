(function() {
    'use strict';

    const menuConfig = {

        megaMenus: [
            {
                toggleId: 'mega_toggle',
                menuSelector: '.mega_menu',
                labelSelector: 'label[for="mega_toggle"]'
            },
            {
                toggleId: 'mega_toggle_2',
                menuSelector: '.fix',
                labelSelector: 'label[for="mega_toggle_2"]'
            }
        ],

        dropdowns: [
            {
                toggleId: 'openToggle',
                menuSelector: '.input_connection',
                labelSelector: 'label[for="openToggle"]'
            },
            {
                toggleId: 'openToggle_sou',
                menuSelector: '.location_sou',
                labelSelector: 'label[for="openToggle_sou"]',
            },
            {
                toggleId: 'openToggle_sou_model',
                menuSelector: '.chose_model_sou',
                labelSelector: 'label[for="openToggle_sou_model"]',
            },
            {
                toggleId: 'openToggle_brand',
                menuSelector: '.brand_form',
                labelSelector: 'label[for="openToggle_brand"]'
            },
            {
                toggleId: 'openToggle_model_all',
                menuSelector: '.all_models',
                labelSelector: 'label[for="openToggle_model_all"]'
            },
            {
                toggleId: 'openToggle_model_chevrolet',
                menuSelector: '.chevrolet_models',
                labelSelector: 'label[for="openToggle_model_chevrolet"]'
            },
            {
                toggleId: 'openToggle_model_jetour',
                menuSelector: '.jetour_models',
                labelSelector: 'label[for="openToggle_model_jetour"]'
            },
            {
                toggleId: 'openToggle_model_soueast',
                menuSelector: '.soueast_models',
                labelSelector: 'label[for="openToggle_model_soueast"]'
            },
            {
                toggleId: 'openToggle_model_mg',
                menuSelector: '.mg_models',
                labelSelector: 'label[for="openToggle_model_mg"]'
            },
            {
                toggleId: 'openToggle_con',
                menuSelector: '.select_con',
                labelSelector: 'label[for="openToggle_con"]'
            },
            {
                toggleId: 'openToggle_tra',
                menuSelector: '.select_tra',
                labelSelector: 'label[for="openToggle_tra"]'
            },
            {
                toggleId: 'openToggle_war',
                menuSelector: '.select_war',
                labelSelector: 'label[for="openToggle_war"]'
            },
            {
                toggleId: 'openToggle_cre',
                menuSelector: '.select_cre',
                labelSelector: 'label[for="openToggle_cre"]'
            },
            {
                toggleId: 'openToggle_spe',
                menuSelector: '.select_spe',
                labelSelector: 'label[for="openToggle_spe"]'
            }
        ],

        exclusiveGroups: [

            ['mega_toggle', 'mega_toggle_2'],           
            
            [
                'openToggle_brand',
                'openToggle_model_all',
                'openToggle_model_chevrolet',
                'openToggle_model_jetour',
                'openToggle_model_soueast',
                'openToggle_model_mg'
            ],

            ['openToggle_sou', 'openToggle_sou_model']
        ]
    };

    const allMenus = [];
    
    menuConfig.megaMenus.forEach(config => {
        const toggle = document.getElementById(config.toggleId);
        const menu = document.querySelector(config.menuSelector);
        const label = document.querySelector(config.labelSelector);
        
        if (toggle && menu && label) {
            allMenus.push({ ...config, toggle, menu, label });
        }
    });
    
    menuConfig.dropdowns.forEach(config => {
        const toggle = document.getElementById(config.toggleId);
        const menu = document.querySelector(config.menuSelector);
        const label = document.querySelector(config.labelSelector);
        
        if (toggle && menu && label) {
            allMenus.push({ ...config, toggle, menu, label });
        }
    });

    function closeExclusiveMenus(currentToggleId) {

        const group = menuConfig.exclusiveGroups.find(g => g.includes(currentToggleId));
        
        if (group) {
            group.forEach(toggleId => {
        
                if (toggleId !== currentToggleId) {
                    const toggle = document.getElementById(toggleId);
                    if (toggle) {
                        toggle.checked = false;
                    }
                }
            });
        }
    }

    document.addEventListener('click', function(event) {

        const clickedLabel = event.target.closest('label');
        if (clickedLabel) {
            const forAttr = clickedLabel.getAttribute('for');
            if (forAttr) {
        
                closeExclusiveMenus(forAttr);
            }
        }
 
        let clickedInsideAnyMenu = false;
        let clickedOnAnyLabel = false;

        allMenus.forEach(menuItem => {
    
            if (menuItem.menu.contains(event.target)) {
                clickedInsideAnyMenu = true;
                
                if (menuItem.closeOnItemClick) {
            
                    if (event.target !== menuItem.menu) {
                        menuItem.toggle.checked = false;
                    }
                }
            }

            if (menuItem.label.contains(event.target)) {
                clickedOnAnyLabel = true;
            }
        });

        if (!clickedInsideAnyMenu && !clickedOnAnyLabel) {
            allMenus.forEach(menuItem => {
                menuItem.toggle.checked = false;
            });
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            allMenus.forEach(menuItem => {
                menuItem.toggle.checked = false;
            });
        }
    });

})();

document.addEventListener("DOMContentLoaded", function() {
    const carPriceInput = document.getElementById("input_50");
    const initialPaymentInput = document.getElementById("input_10");
    const monthButtons = document.querySelectorAll(".month-btn");
    const monthlyResult = document.getElementById("monthly_result");

    let selectedMonths = 12;

    function formatNumber(num) {
        if (isNaN(num)) return "";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function cleanNumber(value) {
        return value.replace(/\D/g, "");
    }

    function handleInputFormat(event) {
        const input = event.target;
        const start = input.selectionStart;
        const clean = cleanNumber(input.value);
        const formatted = formatNumber(clean);
        input.value = formatted;
        input.setSelectionRange(start, start);
        calculate();
    }

    function calculate() {
        const carPrice = parseFloat(cleanNumber(carPriceInput.value)) || 0;
        const initialPayment = parseFloat(cleanNumber(initialPaymentInput.value)) || 0;

        if (initialPayment >= carPrice || carPrice === 0) {
            monthlyResult.textContent = "Введите корректные данные";
            return;
        }

        const monthlyPayment = (carPrice - initialPayment) / selectedMonths;
        monthlyResult.textContent = `${formatNumber(Math.round(monthlyPayment))} UZS/мес`;
    }

    
    monthButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            monthButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedMonths = parseInt(btn.getAttribute("data-months"));
            calculate();
        });
    });

    
    carPriceInput.addEventListener("input", handleInputFormat);
    initialPaymentInput.addEventListener("input", handleInputFormat);

    
    carPriceInput.value = formatNumber(50000000);
    initialPaymentInput.value = formatNumber(10000000);

    calculate();
});

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

document.getElementById('theme_toggle').onclick = function () {
    var currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
};

if (localStorage.getItem('theme') === 'dark') {
    document.getElementById('theme_toggle').checked = true;
}


document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("modal_shown")) {
        document.getElementById("welcome_modal").classList.add("active");
        sessionStorage.setItem("modal_shown", "true");
    }
});

function closeModal() {
    document.getElementById("welcome_modal").classList.remove("active");
}

document.getElementById("welcome_modal").addEventListener("click", () => {
    closeModal();
});