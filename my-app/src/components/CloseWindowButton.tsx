import {FiPlus} from "react-icons/fi";

type CloseWindowButtonProps = {
    onClickAction?: () => void;
}


export function CloseWindowButton({onClickAction}: CloseWindowButtonProps) {
    return (
        <>
            <button onClick={onClickAction}
                    className={"flex w-30 h-7 bg-fuchsia-950 justify-center items-center mx-2 hover:ring-2 hover:bg-fuchsia-800 "}>
                <FiPlus size={23}/> Add Pay
            </button>
        </>
    );
}