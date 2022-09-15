const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/comics/page/:page"],
    exact: true,
    component: "ComicsList",
  },
  {
    path: ["/characters/page/:page"],
    exact: true,
    component: "Characters",
  },
  {
    path: ["/search/:listing/:query"],
    exact: true,
    component: "Search",
  },
  {
    path: ["/comics/:id"],
    exact: true,
    component: "Comics",
  },
  {
    path: ["/error/:errorMsg"],
    exact: true,
    component: "Error",
  },
];

export default routes;
