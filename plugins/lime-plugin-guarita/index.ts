import Menu from "./src/guaritaMenu";
import Page from "./src/guaritaPage";

export default {
    name: "internetControl",
    page: Page,
    menu: Menu,
    isCommunityProtected: true,
    additionalProtectedRoutes: [["internet-control/wellcomescreen", Page]],
} as LimePlugin;
