import { ChangeEvent } from "react"

type CheckBoxType = {
    onChangeStatus: (newIsDoneValue: boolean) => void
    checked: boolean
}

export const CheckBox = (props: CheckBoxType) => {
    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeStatus( e.currentTarget.checked)
    }
    return <>
        <input
            type="checkbox"
            onChange={onChangeHandler}
            checked={props.checked}/>
    </>
}