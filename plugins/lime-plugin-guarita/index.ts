import GuaritaMenu from "./src/guaritaMenu";
import GuaritaPage from "./src/guaritaPage";
import RuleList from "./src/screens/ruleList";

export default {
    name: "internetControl",
    page: GuaritaPage,
    menu: GuaritaMenu,
    // isCommunityProtected: true,
    // additionalProtectedRoutes: [
    //     ["internet-control/wellcomescreen", RuleList],
    // ],
} as LimePlugin;
