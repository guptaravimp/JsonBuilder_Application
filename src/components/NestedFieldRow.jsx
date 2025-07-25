import { Input } from "@/components/ui/input"
import React, {  useEffect, useState } from 'react'




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

function NestedFieldRow ({ field, parentPath, childIndex, onDelete, onAddChild, level = 0, control, watch, setValue }) {
    const [isEditing, setIsEditing] = useState(false)
    const [localFieldName, setlocalfieldName] = useState(field.name || '')
    const [localfieldtype, setlocalfieldtype] = useState(field.type || 'string')
    const handleSave = () => {
        setIsEditing(false)
        updatedFieldproperty('name', localFieldName)
    }
    const handleCancel = () => {
        setIsEditing(false)
        setlocalfieldName(field.name || '')
    }
    const handlekeypress = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            handleCancel()
        }
    }



    const fieldType = localfieldtype
    const fieldName = localFieldName
    useEffect(() => {
        setlocalfieldName(field.name || '')
        setlocalfieldtype(field.type || 'string')
    }, [field.name, field.type])

    const handledeletechild = (nestedchildIndex) => {
        const currentfields = watch('fields')

        const updatedfields = [...currentfields]
        let current = updatedfields[parentPath[0]]
        for (let i = 1; i < parentPath.length; i++) {
            current = current.children[parentPath[i]];
        }
        current = current.children[childIndex]
        current.children = current.children.filter((_, idx) => idx !== nestedchildIndex)
        setValue('fields', updatedfields);

    }




    const handleAddChildTochild = () => {
        const currentfields = watch('fields')
        const updatedfields = [...currentfields]
        let current = updatedfields[parentPath[0]]
        for (let i = 1; i < parentPath.length; i++) {
            current = current.children[parentPath[i]];
        }

        current = current.children[childIndex]
        const newchild = createfield()
        current.children = [...(current.children || []), newchild]
        setValue('fields', updatedfields)





    }


    const updatedFieldproperty = (property, value) => {
        const currentfields = watch('fields')
        const updatedfields = [...currentfields]
        let current = updatedfields[parentPath[0]]
        for (let i = 1; i < parentPath.length; i++) {
            current = current.children[parentPath[i]];
        }
        current = current.children[childIndex]
        current[property] = value
        setValue('fields', updatedfields)
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
                        {
                            isEditing ? (
                                <Input type="text"
                                    value={localFieldName}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setlocalfieldName(newValue);

                                    }

                                    }
                                    onBlur={handleSave}
                                    onKeyDown={handlekeypress}
                                    placeholder='field name'
                                    autoFocus

                                    className="p-2 text-xl  w-[50%] border-[1px] rounded" />


                            ) : (


                                <button className="p-1  w-[50%] border-[1px] rounded flex justify-start items-center" onClick={() => setIsEditing(true)}>
                                    {localFieldName || 'field name'}
                                </button>

                            )
                        }






                        <select
                            value={localfieldtype}
                            onChange={(e) => {
                                setlocalfieldtype(e.target.value)
                                updatedFieldproperty('type', e.target.value)
                            }
                            }
                            className="p-2 w-[20%] border-[1px] cursor-pointer text-md rounded"
                        >
                            {
                                FIELD_TYPE_OPTION.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))
                            }
                        </select>

                        <label className='flex flex-center gap-2'>
                            <div className="relative">
                                <input type='checkbox'

                                    checked={field.required || false}
                                    onChange={(e) => updatedFieldproperty('required', e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-10 h-6 flex justify-center items-start border rounded-full transition-colors ${field.required ? 'bg-blue-500' : 'bg-grey-300'} `}>

                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${field.required ? 'translate-x-2' : '-translate-x-2'} mt-1`}>

                                    </div>
                                </div>
                            </div>
                        </label>



                        <button className="text-4xl"
                            onClick={() => onDelete(childIndex)}
                        >
                            ×
                        </button>
                    </div>




                </div>







                {
                    fieldType === 'nested' && field.children && field.children.length > 0 && (
                        <div>
                            {
                                field.children.map((child, nestedChildIndex) => (
                                    <NestedFieldRow
                                        key={child.id}
                                        field={child}
                                        parentPath={[...parentPath, childIndex]}
                                        childIndex={nestedChildIndex}
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
                        <div className={` border-[1px] p-1 w-[90%] rounded ${level > 0 ? 'ml-16' : ''}`}>
                            <p className="w-full ">No child field yet </p>
                        </div>
                    )
                }



                {
                    fieldType === 'nested' && (
                        <div className={` flex justify-end items-center   ${level > 0 ? 'ml-16' : ''}`}>
                            <button
                                onClick={handleAddChildTochild}
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

export default NestedFieldRow
