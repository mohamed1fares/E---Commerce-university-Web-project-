import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./front/front-layout/front-layout.component').then(
        (m) => m.FrontLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./front/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
      },
      {
        path: 'orderhistory',
        loadComponent: () =>
          import('./front/order-history/order-history.component').then(
            (m) => m.OrderHistoryComponent
          ),
      },
      
      {
        path: 'productDetails/:route',
        loadComponent: () =>
          import('./front/product-details/product-details.component').then(
            m => m.ProductDetailsComponent
          ),
      }
,      
      {
        path: 'cart',
        loadComponent: () =>
          import('./front/front-cart/front-cart.component').then(
            (m) => m.FrontCartComponent
          ),
      },
    ],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./front/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      {path:'',redirectTo:'product',pathMatch:'full'},
      {
        path: 'product',
        loadComponent: () =>
          import(
            './dashboard/product/product-list/product-list.component'
          ).then((m) => m.ProductListComponent),
      },{
      path: 'product/deleted-product',
      loadComponent: () =>
        import(
          './dashboard/product/deleted-product/deleted-product.component'
        ).then((m) => m.DeletedProductComponent),
    },
    {
      path: 'orders',
      loadComponent: () =>
        import(
          './dashboard/order/order-list/order-list.component'
        ).then((m) => m.OrderListComponent),
    },
      {
        path: 'category',
        loadComponent: () =>
          import(
            './dashboard/category/list-category/list-category.component'
          ).then((m) => m.ListCategoryComponent),
      },
      {
        path: 'category/add-category',
        loadComponent: () =>
          import(
            './dashboard/category/add-category/add-category.component'
          ).then((m) => m.AddCategoryComponent),
      },      {
        path: 'category/deletd-category',
        loadComponent: () =>
          import(
            './dashboard/category/deletd-category/deletd-category.component'
          ).then((m) => m.DeletdCategoryComponent),
      },
      {
        path: 'product/add-product',
        loadComponent: () =>
          import('./dashboard/product/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
      {
        path: 'subcategory',
        loadComponent: () =>
          import(
            './dashboard/sub-category/list-sub-category/list-sub-category.component'
          ).then((m) => m.ListSubCategoryComponent),
      },
      {
        path: 'subcategory/add-subcategory',
        loadComponent: () =>
          import(
            './dashboard/sub-category/add-sub-category/add-sub-category.component'
          ).then((m) => m.AddSubCategoryComponent),
      },
      {
        path: 'subcategory/deleted-subcategory',
        loadComponent: () =>
          import(
            './dashboard/sub-category/deleted-category/deleted-category.component'
          ).then((m) => m.DeletedCategoryComponent),
      },
      {
        path: 'brand',
        loadComponent: () =>
          import('./dashboard/brand/list-brand/list-brand.component').then(
            (m) => m.ListBrandComponent
          ),
      },

      {
        path: 'brand/add-brand',
        loadComponent: () =>
          import('./dashboard/brand/add-brand/add-brand.component').then(
            (m) => m.AddBrandComponent
          ),
      },
      {
        path: 'brand/deleted-brand',
        loadComponent: () =>
          import(
            './dashboard/brand/deleted-brand/deleted-brand.component'
          ).then((m) => m.DeletedBrandComponent)
      }
      ,
      {
        path: 'about',
        loadComponent: () =>
          import('./dashboard/edit-about/edit-about.component').then(
            (m) => m.EditAboutComponent
          ),
      },
    ],
    canActivate: [adminGuard],
  },
];
