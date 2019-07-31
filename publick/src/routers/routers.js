export default [
  {
    path: "/fuse/fsProductsCenter",
    components: () => import("view/productCenter")
  },
  {
    path: "/fuse/fsProductsCenterNoAuth",
    components: () => import("view/productCenter/ProductsCenterNoAuth")
  },
  {
    path: "/fuse/fsProductsProcAndSalesNoAuth",
    components: () => import("view/productCenter/ProductsCenterProcAndSalesNoAuth")
  },
  {
    path: "/fuse/industryR/brandF",
    components: () => import("view/industryR/industryRBrandF")
  }
];

