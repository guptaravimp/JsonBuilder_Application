import { Input } from "@/components/ui/input"
import React, {  useState } from 'react'

import { Controller } from 'react-hook-form';


const FIELD_TYPE_OPTION = [
    { value: "string", label: "string" },
    { value: "number", label: "number" },
    { value: "nested", label: "nested" },
];

const generate_id = () => Math.random().toString(36).substr(2, 9);


const createfield = (name = '', type = 'string') => ({
    id: generate_id(),
    name,
    type,
    required: false,
    children: []
})
import NestedFieldRow from './NestedfieldRow'
function FieldRow  ({
    field,
    index,
    onDelete,
    onAddChild,
    level = 0,
    control,
    watch,
    setValue

})  {

    const [isEditing, setIsEditing] = useState(false)




    const handleSave = () => {
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handlekeypress = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            handleCancel()
        }
    }

    const fieldType = watch(`fields.${index}.type`)
    const fieldName = watch(`fields.${index}.name`)


    const handledeletechild = (childIndex) => {
        const currentfields = watch('fields')
        const currentchildren = field.children || []
        const updatedchildren = currentchildren.filter((_, index) => index !== childIndex)
        const updatedfields = [...currentfields]
        updatedfields[index] = {
            ...updatedfields[index],
            children: updatedchildren
        }
        setValue('fields', updatedfields)
    }




    const handleAddChildTochild = (childIndex) => {
        const currentfields = watch('fields')
        const currentchildren = field.children || []
        const childfield = currentchildren[childIndex]
        if (childfield && childfield.type === 'nested') {
            const newchild = createfield()
            const updatedchildren = currentchildren.map((child, index) => {
                if (index === childIndex) {
                    return { ...child, children: [...(child.children || []), newchild] }
                }
                return child
            })
            const updatedfields = [...currentfields]
            updatedfields[index] = {
                ...updatedfields[index],
                children: updatedchildren
            }
            setValue('fields', updatedfields)

        }
    }


    return (
        <div className="w-[100%]">


            <div className="w-full">
                <div className={` w-full ${level > 0 ? "ml-6" : ""}`}>
                    {
                        level > 0 && (
                            <div></div>
                        )
                    }
                    <div className='  p-1 flex justify-between items-center gap-2 w-full'>

                        <Controller
                            name={`fields.${index}.name`}

                            control={control}
                            rules={{ required: "Field name is required" }}
                            render={({ field: { onChange, value } }) => (

                                <Input type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={handleSave}
                                    onKeyDown={handlekeypress}
                                    placeholder='field name'
                                    autoFocus

                                    className="p-2 text-xl w-[50%] border-[1px] rounded" />

                            )}




                        />





                        <Controller name={`fields.${index}.type`}
                            control={control}
                            render={({ field: { onChange, value } }) => (

                                <select
                                    value={value}
                                    onChange={onChange}
                                    className="p-2 w-[20%] border-[1px] text-md rounded cursor-pointer"
                                >
                                    {
                                        FIELD_TYPE_OPTION.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))
                                    }
                                </select>
                            )} />

                        <Controller name={`fields.${index}.required`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <label className='flex flex-center gap-2'>
                                    <div>
                                        <input
                                            type='checkbox'
                                            checked={value}
                                            onChange={onChange}
                                            className="sr-only"
                                        />
                                        <div className={`w-10 h-6 flex justify-center items-start border rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-grey-300'} `}>

                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${value ? 'translate-x-2' : '-translate-x-2'} mt-1`}>

                                            </div>
                                        </div>
                                    </div>
                                </label>

                            )} />


                        <button className="text-4xl"
                            onClick={() => onDelete(index)}
                        >
                            ×
                        </button>
                    </div>




                </div>







                {
                    fieldType === 'nested' && field.children && field.children.length > 0 && (
                        <div>
                            {
                                field.children.map((child, childIndex) => (
                                    <NestedFieldRow

                                        key={child.id}
                                        field={child}
                                        parentPath={[index]}
                                        childIndex={childIndex}
                                        // index={`${index}.children.${childIndex}`}
                                        onDelete={handledeletechild}
                                        onAddChild={handleAddChildTochild}
                                        level={level + 1}
                                        control={control}
                                        watch={watch}
                                        setValue={setValue} />
                                ))
                            }

                        </div>
                    )
                }



                {
                    fieldType === 'nested' && (!field.children || field.children.length === 0) && (
                        <div className={`border-[1px] rounded p-1 mt-1 w-[90%]  flex justify-center text-center ${level > 0 ? 'ml-6' : ''}`}>
                            <p>No child field yet</p>
                        </div>
                    )
                }
                {
                    fieldType === 'nested' && (
                        <div className={` flex justify-end items-center   ${level > 0 ? 'ml-6' : ''}`}>
                            <button
                                onClick={() => {
                                    console.log("Add child button clicked for index ", index)
                                    onAddChild(index)
                                }}
                                className="w-[80%]  mt-4 p-2 bg-blue-600 rounded-xl"
                            >
                                Add child field
                            </button>

                        </div>
                    )
                }



            </div>

        </div>
    )

}

export default FieldRow
