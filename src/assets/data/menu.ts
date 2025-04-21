import type { MenuItemType } from '@/types/menu';

export const MENU_ITEMS: MenuItemType[] = [
    {
        key: 'menu',
        label: 'MENU',
        isTitle: true,
    },
    {
        key: 'dashboard',
        icon: 'solar:home-2-broken',
        label: 'Dashboard',
        badge: {
            text: '9+',
            variant: 'success',
        },
        route: { name: 'dashboards.index' },
    },
    {
        key: 'products',
        label: 'PRODUCTOS',
        isTitle: true,
    },
    {
        key:'products-list',
        icon: 'solar:tag-price-broken',
        label: 'Productos',
        route: {name: 'products.products'}
    }, 
    {
        key: 'categories',
        icon: 'solar:list-broken',
        label: 'Categorías',
        route: {name: 'products.categories'}
    },
    {
        key: 'subcategories',
        icon: 'solar:list-broken',
        label: 'Subcategorías',
        route: {name: 'products.subcategories'}
    },
    {
        key: 'users',
        label: 'USUARIOS',
        isTitle: true,
    },
    {
        key:'users-list',
        icon: 'solar:user-bold',
        label: 'Usuarios',
        route: {name: 'users.users'}
    }, 
    {
        key:'users-type',
        icon: 'solar:user-id-bold',
        label: 'Tipos de Usuario',
        route: {name: 'users.types'}
    },
    {
        key: 'banners',
        label: 'BANNERS',
        isTitle: true,
    },
    {
        key:'banners',
        icon: 'solar:gallery-round-bold-duotone',
        label: 'Banners',
        route: {name: 'banners.banners'}
    }, 
    {
        key: 'apps',
        label: 'APPS',
        isTitle: true,
    },
    {
        key: 'apps-chat',
        icon: 'solar:chat-round-call-broken',
        label: 'Chat',
        route: { name: 'apps.chat' },

    },
    {
        key: 'apps-email',
        icon: 'solar:letter-broken',
        label: 'Email',
        route: { name: 'apps.email' },

    },
    {
        key: 'apps-calendar',
        icon: 'solar:calendar-broken',
        label: 'Calendar',
        children: [
            {
                key: 'calendar-schedule',
                label: 'Schedule',
                route: { name: 'apps.calendar.schedule' },
            },
            {
                key: 'calendar-integration',
                label: 'Integration',
                route: { name: 'apps.calendar.integration' },
            },
        ],
    },
    {
        key: 'apps-todo',
        icon: 'solar:list-heart-minimalistic-broken',
        label: 'Todo',
        route: { name: 'apps.todo' },
    },

    {
        key: 'apps-invoices',
        icon: 'solar:bill-list-broken',
        label: 'Invoices',
        children: [
            {
                key: 'invoices',
                label: 'Invoices',
                route: { name: 'apps.invoice.list' },
                parentKey: 'apps-invoices',
            },
            {
                key: 'invoices-details',
                label: 'Invoices Details',
                route: { name: 'apps.invoice.details', params: { id: 'RB6985' } },
                parentKey: 'apps-invoices',
            },
        ],
    },
    {
        key: 'custom',
        label: 'Custom',
        isTitle: true,
    },
    {
        key: 'pages',
        label: 'Pages',
        isTitle: false,
        icon: 'solar:folder-with-files-broken',
        children: [
            {
                key: 'page-welcome',
                label: 'Welcome',
                route: { name: 'pages.welcome' },
                parentKey: 'pages',
            },
            {
                key: 'page-faqs',
                label: 'FAQs',
                route: { name: 'pages.faqs' },
                parentKey: 'pages',
            },
            {
                key: 'page-coming-soon',
                label: 'Coming Soon',
                route: { name: 'pages.coming-soon' },
                parentKey: 'pages',
                target: '_blank',
            },
            {
                key: 'page-timeline',
                label: 'Timeline',
                route: { name: 'pages.timeline' },
                parentKey: 'pages',
            },
            {
                key: 'page-pricing',
                label: 'Pricing',
                route: { name: 'pages.pricing' },
                parentKey: 'pages',
            },
            {
                key: 'page-maintenance',
                label: 'Maintenance',
                route: { name: 'pages.maintenance' },
                parentKey: 'pages',
                target: '_blank',
            },
            {
                key: 'page-404-error',
                label: '404 Error',
                route: { name: 'error.404' },
                parentKey: 'pages',
                target: '_blank',
            },
            {
                key: 'page-error-404-alt',
                label: 'Error 404 Alt',
                route: { name: 'error.404-alt' },
                parentKey: 'pages',
            },
        ],
    },
    {
        key: 'page-authentication',
        label: 'Authentication',
        isTitle: false,
        icon: 'solar:lock-password-unlocked-broken',
        children: [
            {
                key: 'sign-in',
                label: 'Sign In',
                route: { name: 'auth.sign-in' },
                parentKey: 'page-authentication',
            },
            {
                key: 'signup',
                label: 'Sign Up',
                route: { name: 'auth.sign-up' },
                parentKey: 'page-authentication',
            },
            {
                key: 'reset-pass',
                label: 'Reset Password',
                route: { name: 'auth.reset-password' },
                parentKey: 'page-authentication',
            },
            {
                key: 'lock-screen',
                label: 'Lock Screen',
                route: { name: 'auth.lock-screen' },
                parentKey: 'page-authentication',
            },
        ],
    },
    {
        key: 'widgets',
        icon: 'solar:gift-broken',
        label: 'Widgets',
        badge: {
            text: 'Hot',
            variant: 'danger',
        },
        route: { name: 'widgets' }
    },
    {
        key: 'components',
        label: 'COMPONENTS',
        isTitle: true,
    },
    {
        key: 'base-ui',
        icon: 'solar:fire-broken',
        label: 'Base UI',
        children: [
            {
                key: 'base-ui-accordions',
                label: 'Accordions',
                route: { name: 'ui.accordions' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-alerts',
                label: 'Alerts',
                route: { name: 'ui.alerts' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-avatars',
                label: 'Avatars',
                route: { name: 'ui.avatars' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-badges',
                label: 'Badges',
                route: { name: 'ui.badges' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-breadcrumb',
                label: 'Breadcrumb',
                route: { name: 'ui.breadcrumb' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-buttons',
                label: 'Buttons',
                route: { name: 'ui.buttons' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-cards',
                label: 'Cards',
                route: { name: 'ui.cards' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-carousel',
                label: 'Carousel',
                route: { name: 'ui.carousel' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-collapse',
                label: 'Collapse',
                route: { name: 'ui.collapse' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-dropdowns',
                label: 'Dropdowns',
                route: { name: 'ui.dropdowns' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-list-group',
                label: 'List Group',
                route: { name: 'ui.list-group' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-modals',
                label: 'Modals',
                route: { name: 'ui.modals' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-tabs',
                label: 'Tabs',
                route: { name: 'ui.tabs' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-offcanvas',
                label: 'Offcanvas',
                route: { name: 'ui.offcanvas' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-pagination',
                label: 'Pagination',
                route: { name: 'ui.pagination' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-placeholders',
                label: 'Placeholders',
                route: { name: 'ui.placeholders' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-popovers',
                label: 'Popovers',
                route: { name: 'ui.popovers' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-progress',
                label: 'Progress',
                route: { name: 'ui.progress' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-spinners',
                label: 'Spinners',
                route: { name: 'ui.spinners' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-toasts',
                label: 'Toasts',
                route: { name: 'ui.toasts' },
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-tooltips',
                label: 'Tooltips',
                route: { name: 'ui.tooltips' },
                parentKey: 'base-ui',
            },
        ],
    },
    {
        key: 'advanced-ui',
        icon: 'solar:magic-stick-3-broken',
        label: 'Advanced UI',
        children: [
            {
                key: 'advanced-ui-ratings',
                label: 'Ratings',
                route: { name: 'advanced.ratings' },
                parentKey: 'advanced-ui',
            },
            {
                key: 'advanced-ui-sweet-alert',
                label: 'Sweet Alert',
                route: { name: 'advanced.alert' },
                parentKey: 'advanced-ui',
            },
            {
                key: 'advanced-ui-swiper-slider',
                label: 'Swiper Slider',
                route: { name: 'advanced.swiper' },
                parentKey: 'advanced-ui',
            },
            {
                key: 'advanced-ui-scrollbar',
                label: 'Scrollbar',
                route: { name: 'advanced.scrollbar' },
                parentKey: 'advanced-ui',
            },
            {
                key: 'advanced-ui-toastify',
                label: 'Toastify',
                route: { name: 'advanced.toastify' },
                parentKey: 'advanced-ui',
            },
        ],
    },
    {
        key: 'charts',
        icon: 'solar:chart-square-broken',
        label: 'Charts',
        children: [
            {
                key: 'charts-area',
                label: 'Area',
                route: { name: 'charts.area' },
                parentKey: 'charts',
            },
            {
                key: 'charts-bar',
                label: 'Bar',
                route: { name: 'charts.bar' },
                parentKey: 'charts',
            },
            {
                key: 'charts-bubble',
                label: 'Bubble',
                route: { name: 'charts.bubble' },
                parentKey: 'charts',
            },
            {
                key: 'charts-candle-stick',
                label: 'Candle Stick',
                route: { name: 'charts.candlestick' },
                parentKey: 'charts',
            },
            {
                key: 'charts-column',
                label: 'Column',
                route: { name: 'charts.column' },
                parentKey: 'charts',
            },
            {
                key: 'charts-heatmap',
                label: 'Heatmap',
                route: { name: 'charts.heatmap' },
                parentKey: 'charts',
            },
            {
                key: 'charts-line',
                label: 'Line',
                route: { name: 'charts.line' },
                parentKey: 'charts',
            },
            {
                key: 'charts-mixed',
                label: 'Mixed',
                route: { name: 'charts.mixed' },
                parentKey: 'charts',
            },
            {
                key: 'charts-timeline',
                label: 'Timeline',
                route: { name: 'charts.timeline' },
                parentKey: 'charts',
            },
            {
                key: 'charts-boxplot',
                label: 'Boxplot',
                route: { name: 'charts.boxplot' },
                parentKey: 'charts',
            },
            {
                key: 'charts-treemap',
                label: 'Treemap',
                route: { name: 'charts.treemap' },
                parentKey: 'charts',
            },
            {
                key: 'charts-pie',
                label: 'Pie',
                route: { name: 'charts.pie' },
                parentKey: 'charts',
            },
            {
                key: 'charts-radar',
                label: 'Radar',
                route: { name: 'charts.radar' },
                parentKey: 'charts',
            },
            {
                key: 'charts-radial-bar',
                label: 'Radial Bar',
                route: { name: 'charts.radial-bar' },
                parentKey: 'charts',
            },
            {
                key: 'charts-scatter',
                label: 'Scatter',
                route: { name: 'charts.scatter' },
                parentKey: 'charts',
            },
            {
                key: 'charts-polar-area',
                label: 'Polar Area',
                route: { name: 'charts.polar' },
                parentKey: 'charts',
            },
        ],
    },
    {
        key: 'forms',
        icon: 'solar:checklist-broken',
        label: 'Forms',
        children: [
            {
                key: 'forms-basic-elements',
                label: 'Basic Elements',
                route: { name: 'forms.basic' },
                parentKey: 'forms',
            },
            {
                key: 'forms-checkbox&radio',
                label: 'Checkbox & Radio',
                route: { name: 'forms.checkbox' },
                parentKey: 'forms',
            },
            {
                key: 'forms-choice-select',
                label: 'Choice Select',
                route: { name: 'forms.select' },
                parentKey: 'forms',
            },
            {
                key: 'forms-clipboard',
                label: 'Clipboard',
                route: { name: 'forms.clipboard' },
                parentKey: 'forms',
            },
            {
                key: 'forms-flat-picker',
                label: 'Flat Picker',
                route: { name: 'forms.flat-picker' },
                parentKey: 'forms',
            },
            {
                key: 'forms-validation',
                label: 'Validation',
                route: { name: 'forms.validation' },
                parentKey: 'forms',
            },
            {
                key: 'forms-wizard',
                label: 'Wizard',
                route: { name: 'forms.wizard' },
                parentKey: 'forms',
            },
            {
                key: 'forms-file-uploads',
                label: 'File Uploads',
                route: { name: 'forms.file-uploads' },
                parentKey: 'forms',
            },
            {
                key: 'forms-editors',
                label: 'Editors',
                route: { name: 'forms.editors' },
                parentKey: 'forms',
            },
            {
                key: 'forms-input-mask',
                label: 'Input Mask',
                route: { name: 'forms.input-mask' },
                parentKey: 'forms',
            },
            {
                key: 'forms-slider',
                label: 'Slider',
                route: { name: 'forms.slider' },
                parentKey: 'forms',
            },
        ],
    },
    {
        key: 'tables',
        icon: 'solar:bedside-table-4-broken',
        label: 'Tables',
        children: [
            {
                key: 'tables-basic',
                label: 'Basic Tables',
                route: { name: 'tables.basic' },
                parentKey: 'tables',
            },
            {
                key: 'tables-grid-js',
                label: 'Grid JS',
                route: { name: 'tables.gridjs' },
                parentKey: 'tables',
            },
        ],
    },
    {
        key: 'icons',
        icon: 'solar:bicycling-broken',
        label: 'Icons',
        children: [
            {
                key: 'icons-boxicons',
                label: 'Boxicons',
                route: { name: 'icons.boxicons' },
                parentKey: 'icons',
            },
            {
                key: 'icons-iconamoon',
                label: 'Solar Icon',
                route: { name: 'icons.solar' },
                parentKey: 'icons',
            },
        ],
    },
    {
        key: 'maps',
        icon: 'solar:streets-map-point-broken',
        label: 'Maps',
        children: [
            {
                key: 'maps-google',
                label: 'Google Maps',
                route: { name: 'maps.google' },
                parentKey: 'maps',
            },
            {
                key: 'maps-vector',
                label: 'Vector Maps',
                route: { name: 'maps.vector' },
                parentKey: 'maps',
            },
        ],
    },
    {
        key: 'badge-menu',
        icon: 'solar:football-broken',
        label: 'Badge Menu',
        badge: {
            text: '1',
            variant: 'primary',
        },
    },
    {
        key: 'menuitem',
        icon: 'solar:share-broken',
        label: 'Menu Item',
        children: [
            {
                key: 'menu-item-1',
                label: 'Menu Item 1',
                parentKey: 'menuitem',
            },
            {
                key: 'menu-item-2',
                label: 'Menu Item 2',
                parentKey: 'menuitem',
                children: [
                    {
                        key: 'menu-sub-item',
                        label: 'Menu Sub Item',
                        parentKey: 'menu-item-2',
                    },
                ],
            },
        ],
    },
    {
        key: 'disabled-item',
        icon: 'solar:dislike-broken',
        label: 'Disabled Item',
        //   isDisabled: true,
    },
];
