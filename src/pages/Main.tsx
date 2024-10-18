import GenModal from "../components/GenModal/GenModal";
import GenTable from "../components/GenTable/GenTable";
import { APP_NAME } from "../shared/constants/global";

export default function Main() {

    return (
        <div className="flex justify-center items-center h-auto bg-color-1">
            <div className="bg-color-2 w-[80vw] h-auto text-white rounded-md my-10">
                <div className="flex justify-between items-center bg-color-4 w-full py-[1vh] rounded-t-md">
                    <div></div>
                    <p className="text-xl">{APP_NAME}</p>
                    <div className="mr-4">
                        <GenModal />
                    </div>
                </div>
                <div className="p-4 overflow-auto">
                    <GenTable />
                </div>
            </div>
        </div>
    );
}
