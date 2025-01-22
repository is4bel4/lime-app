import { Loading } from "components/loading";

// import { useListVouchers } from "./guaritaQueries";
import RuleList from "./screens/ruleList";

const GuaritaPage = ({}) => {
    // const { isLoading } = useListVouchers();
    // if (isLoading) {
    //     return (
    //         <div className="container container-center">
    //             <Loading />
    //         </div>
    //     );
    // }
    return <RuleList />;
};

export default GuaritaPage;
