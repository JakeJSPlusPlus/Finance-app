import {ChangeEvent} from "react";


type DaysFilterProps = {
    onChangeAction: (val:number) => void
}

export function DaysFilter({onChangeAction}: DaysFilterProps) {
    return (
        <>
            <div className="flex gap-2">
                <input
                    className={"text-black border-black placeholder:text-muted-foreground ring-1 rounded-md pl-1"}
                    defaultValue={14}
                    type={"number"}
                    onChange={(e) => onChangeAction(e.currentTarget.valueAsNumber)} />
            </div>
        </>
    );

}