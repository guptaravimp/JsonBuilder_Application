import { Input } from "@/components/ui/input"
import React, { useCallback, useEffect, useState } from 'react'

import FieldRow from "./FieldRow";
import {  useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
    Card,
    CardContent,

} from "@/components/ui/card"




const generate_id = () => Math.random().toString(36).substr(2, 9);


const createfield = (name = '', type = 'string') => ({
    id: generate_id(),
    name,
    type,
    required: false,
    children: []
})




// const FieldRow = ({
//     field,
//     index,
//     onDelete,
//     onAddChild,
//     level = 0,
//     control,
//     watch,
//     setValue

// }) => {

//     const [isEditing, setIsEditing] = useState(false)




//     const handleSave = () => {
//         setIsEditing(false)
//     }

//     const handleCancel = () => {
//         setIsEditing(false)
//     }

//     const handlekeypress = (e) => {
//         if (e.key === 'Enter') {
//             handleSave()
//         } else if (e.key === 'Escape') {
//             handleCancel()
//         }
//     }

//     const fieldType = watch(`fields.${index}.type`)
//     const fieldName = watch(`fields.${index}.name`)


//     const handledeletechild = (childIndex) => {
//         const currentfields = watch('fields')
//         const currentchildren = field.children || []
//         const updatedchildren = currentchildren.filter((_, index) => index !== childIndex)
//         const updatedfields = [...currentfields]
//         updatedfields[index] = {
//             ...updatedfields[index],
//             children: updatedchildren
//         }
//         setValue('fields', updatedfields)
//     }




//     const handleAddChildTochild = (childIndex) => {
//         const currentfields = watch('fields')
//         const currentchildren = field.children || []
//         const childfield = currentchildren[childIndex]
//         if (childfield && childfield.type === 'nested') {
//             const newchild = createfield()
//             const updatedchildren = currentchildren.map((child, index) => {
//                 if (index === childIndex) {
//                     return { ...child, children: [...(child.children || []), newchild] }
//                 }
//                 return child
//             })
//             const updatedfields = [...currentfields]
//             updatedfields[index] = {
//                 ...updatedfields[index],
//                 children: updatedchildren
//             }
//             setValue('fields', updatedfields)

//         }
//     }


//     return (
//         <div className="w-[100%]">


//             <div className="w-full">
//                 <div className={` w-full ${level > 0 ? "ml-6" : ""}`}>
//                     {
//                         level > 0 && (
//                             <div></div>
//                         )
//                     }
//                     <div className='  p-1 flex justify-between items-center gap-2 w-full'>

//                         <Controller
//                             name={`fields.${index}.name`}

//                             control={control}
//                             rules={{ required: "Field name is required" }}
//                             render={({ field: { onChange, value } }) => (

//                                 <Input type="text"
//                                     value={value}
//                                     onChange={onChange}
//                                     onBlur={handleSave}
//                                     onKeyDown={handlekeypress}
//                                     placeholder='field name'
//                                     autoFocus

//                                     className="p-2 text-xl w-[50%] border-[1px] rounded" />

//                             )}




//                         />





//                         <Controller name={`fields.${index}.type`}
//                             control={control}
//                             render={({ field: { onChange, value } }) => (

//                                 <select
//                                     value={value}
//                                     onChange={onChange}
//                                     className="p-2 w-[20%] border-[1px] text-md rounded cursor-pointer"
//                                 >
//                                     {
//                                         FIELD_TYPE_OPTION.map(type => (
//                                             <option key={type.value} value={type.value}>
//                                                 {type.label}
//                                             </option>
//                                         ))
//                                     }
//                                 </select>
//                             )} />

//                         <Controller name={`fields.${index}.required`}
//                             control={control}
//                             render={({ field: { onChange, value } }) => (
//                                 <label className='flex flex-center gap-2'>
//                                     <div>
//                                         <input
//                                             type='checkbox'
//                                             checked={value}
//                                             onChange={onChange}
//                                             className="sr-only"
//                                         />
//                                         <div className={`w-10 h-6 flex justify-center items-start border rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-grey-300'} `}>

//                                             <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${value ? 'translate-x-2' : '-translate-x-2'} mt-1`}>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </label>

//                             )} />


//                         <button className="text-4xl"
//                             onClick={() => onDelete(index)}
//                         >
//                             ×
//                         </button>
//                     </div>




//                 </div>







//                 {
//                     fieldType === 'nested' && field.children && field.children.length > 0 && (
//                         <div>
//                             {
//                                 field.children.map((child, childIndex) => (
//                                     <NestedFieldRow

//                                         key={child.id}
//                                         field={child}
//                                         parentPath={[index]}
//                                         childIndex={childIndex}
//                                         // index={`${index}.children.${childIndex}`}
//                                         onDelete={handledeletechild}
//                                         onAddChild={handleAddChildTochild}
//                                         level={level + 1}
//                                         control={control}
//                                         watch={watch}
//                                         setValue={setValue} />
//                                 ))
//                             }

//                         </div>
//                     )
//                 }



//                 {
//                     fieldType === 'nested' && (!field.children || field.children.length === 0) && (
//                         <div className={`border-[1px] rounded p-1 mt-1 w-[90%]  flex justify-center text-center ${level > 0 ? 'ml-6' : ''}`}>
//                             <p>No child field yet</p>
//                         </div>
//                     )
//                 }
//                 {
//                     fieldType === 'nested' && (
//                         <div className={` flex justify-end items-center   ${level > 0 ? 'ml-6' : ''}`}>
//                             <button
//                                 onClick={() => {
//                                     console.log("Add child button clicked for index ", index)
//                                     onAddChild(index)
//                                 }}
//                                 className="w-[80%]  mt-4 p-2 bg-blue-600 rounded-xl"
//                             >
//                                 Add child field
//                             </button>

//                         </div>
//                     )
//                 }



//             </div>

//         </div>
//     )

// }

// const NestedFieldRow = ({ field, parentPath, childIndex, onDelete, onAddChild, level = 0, control, watch, setValue }) => {
//     const [isEditing, setIsEditing] = useState(false)
//     const [localFieldName, setlocalfieldName] = useState(field.name || '')
//     const [localfieldtype, setlocalfieldtype] = useState(field.type || 'string')
//     const handleSave = () => {
//         setIsEditing(false)
//         updatedFieldproperty('name', localFieldName)
//     }
//     const handleCancel = () => {
//         setIsEditing(false)
//         setlocalfieldName(field.name || '')
//     }
//     const handlekeypress = (e) => {
//         if (e.key === 'Enter') {
//             handleSave()
//         } else if (e.key === 'Escape') {
//             handleCancel()
//         }
//     }



//     const fieldType = localfieldtype
//     const fieldName = localFieldName
//     useEffect(() => {
//         setlocalfieldName(field.name || '')
//         setlocalfieldtype(field.type || 'string')
//     }, [field.name, field.type])

//     const handledeletechild = (nestedchildIndex) => {
//         const currentfields = watch('fields')

//         const updatedfields = [...currentfields]
//         let current = updatedfields[parentPath[0]]
//         for (let i = 1; i < parentPath.length; i++) {
//             current = current.children[parentPath[i]];
//         }
//         current = current.children[childIndex]
//         current.children = current.children.filter((_, idx) => idx !== nestedchildIndex)
//         setValue('fields', updatedfields);

//     }




//     const handleAddChildTochild = () => {
//         const currentfields = watch('fields')
//         const updatedfields = [...currentfields]
//         let current = updatedfields[parentPath[0]]
//         for (let i = 1; i < parentPath.length; i++) {
//             current = current.children[parentPath[i]];
//         }

//         current = current.children[childIndex]
//         const newchild = createfield()
//         current.children = [...(current.children || []), newchild]
//         setValue('fields', updatedfields)





//     }


//     const updatedFieldproperty = (property, value) => {
//         const currentfields = watch('fields')
//         const updatedfields = [...currentfields]
//         let current = updatedfields[parentPath[0]]
//         for (let i = 1; i < parentPath.length; i++) {
//             current = current.children[parentPath[i]];
//         }
//         current = current.children[childIndex]
//         current[property] = value
//         setValue('fields', updatedfields)
//     }





//     return (
//         <div className="w-[100%]">


//             <div className="w-full">
//                 <div className={` w-full ${level > 0 ? "ml-6" : ""}`}>
//                     {
//                         level > 0 && (
//                             <div></div>
//                         )
//                     }
//                     <div className='  p-1 flex justify-between items-center gap-2 w-full'>
//                         {
//                             isEditing ? (
//                                 <Input type="text"
//                                     value={localFieldName}
//                                     onChange={(e) => {
//                                         const newValue = e.target.value;
//                                         setlocalfieldName(newValue);

//                                     }

//                                     }
//                                     onBlur={handleSave}
//                                     onKeyDown={handlekeypress}
//                                     placeholder='field name'
//                                     autoFocus

//                                     className="p-2 text-xl  w-[50%] border-[1px] rounded" />


//                             ) : (


//                                 <button className="p-1  w-[50%] border-[1px] rounded flex justify-start items-center" onClick={() => setIsEditing(true)}>
//                                     {localFieldName || 'field name'}
//                                 </button>

//                             )
//                         }






//                         <select
//                             value={localfieldtype}
//                             onChange={(e) => {
//                                 setlocalfieldtype(e.target.value)
//                                 updatedFieldproperty('type', e.target.value)
//                             }
//                             }
//                             className="p-2 w-[20%] border-[1px] cursor-pointer text-md rounded"
//                         >
//                             {
//                                 FIELD_TYPE_OPTION.map(type => (
//                                     <option key={type.value} value={type.value}>{type.label}</option>
//                                 ))
//                             }
//                         </select>

//                         <label className='flex flex-center gap-2'>
//                             <div className="relative">
//                                 <input type='checkbox'

//                                     checked={field.required || false}
//                                     onChange={(e) => updatedFieldproperty('required', e.target.checked)}
//                                     className="sr-only"
//                                 />
//                                 <div className={`w-10 h-6 flex justify-center items-start border rounded-full transition-colors ${field.required ? 'bg-blue-500' : 'bg-grey-300'} `}>

//                                     <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${field.required ? 'translate-x-2' : '-translate-x-2'} mt-1`}>

//                                     </div>
//                                 </div>
//                             </div>
//                         </label>



//                         <button className="text-4xl"
//                             onClick={() => onDelete(childIndex)}
//                         >
//                             ×
//                         </button>
//                     </div>




//                 </div>







//                 {
//                     fieldType === 'nested' && field.children && field.children.length > 0 && (
//                         <div>
//                             {
//                                 field.children.map((child, nestedChildIndex) => (
//                                     <NestedFieldRow
//                                         key={child.id}
//                                         field={child}
//                                         parentPath={[...parentPath, childIndex]}
//                                         childIndex={nestedChildIndex}
//                                         onDelete={handledeletechild}
//                                         onAddChild={handleAddChildTochild}
//                                         level={level + 1}
//                                         control={control}
//                                         watch={watch}
//                                         setValue={setValue} />
//                                 ))
//                             }

//                         </div>
//                     )
//                 }



//                 {
//                     fieldType === 'nested' && (!field.children || field.children.length === 0) && (
//                         <div className={` border-[1px] p-1 w-[90%] rounded ${level > 0 ? 'ml-16' : ''}`}>
//                             <p className="w-full ">No child field yet </p>
//                         </div>
//                     )
//                 }



//                 {
//                     fieldType === 'nested' && (
//                         <div className={` flex justify-end items-center   ${level > 0 ? 'ml-16' : ''}`}>
//                             <button
//                                 onClick={handleAddChildTochild}
//                                 className="w-[80%]  mt-4 p-2 bg-blue-600 rounded-xl"
//                             >
//                                 Add child field
//                             </button>

//                         </div>
//                     )
//                 }



//             </div>

//         </div>
//     )
// }

function JsonBuilder({ className }) {



    const { control, watch, handleSubmit, setValue, formState: { errors }
    } = useForm({
        defaultValues: {
            fields: []
        }
    });


    const { fields: formFields, append, remove } = useFieldArray({
        control,
        name: "fields"
    })


    const handledeleteField = (index) => {
        remove(index)
    }

    const handleAddField = () => {
        append(createfield())
    }


    const handleAddChild = useCallback((parentIndex) => {
        const currentfields = watch('fields')
        const parentfield = currentfields[parentIndex]
        if (parentfield && parentfield.type === 'nested') {
            const currentchildren = parentfield.children || []
            const newchild = createfield()
            const updatedfield = [...currentfields]
            updatedfield[parentIndex] = {
                ...updatedfield[parentIndex],
                children: [...currentchildren, newchild]
            }
            setValue('fields', updatedfield);
        } else {
            console.log("field is not nested ")
        }

    })

    const generateschema = (fields) => {
        const schema = {}
        fields.forEach(field => {
            if (field.name && field.name.trim()) {
                if (field.type === 'nested') {
                    schema[field.name] = generateschema(field.children || [])
                } else {
                    schema[field.name] = field.type === 'string' ? 'STRING' : 'NUMBER'
                }
            }
        })
        return schema;
    }



    const watchedFields = watch('fields')
    const jsonSchema = generateschema(watchedFields || [])



    return (
        <div className={`json-builder-container mx-auto w-[100%] flex justify-between items-center gap-10 `}>

            <div className=' form-section w-[70%] flex flex-col justify-center items-center'>
                <h1 className='text-2xl p-2'>Fields Definition</h1>
                <Card className={"p-6 w-[100%]"}>
                    <form onSubmit={handleSubmit((data) => {
                        console.log('Form Data ', data);
                        alert("go to console to see form Data ")
                    })}>

                        <CardContent>
                            <div className=''>
                                 {
                                    formFields.length===0 ? (
<div className="p-1 text-center w-[90%] rounded">No field Yet</div>
                                    ):(
                                        // {
                                    formFields.map((field, index) => (
                                        <FieldRow
                                            key={field.id}
                                            field={field}
                                            index={index}
                                            onDelete={handledeleteField}
                                            onAddChild={handleAddChild}
                                            control={control}
                                            watch={watch}
                                            setValue={setValue}

                                        />
                                    ))
                                // }
                                    )
                                 }
                                



                                <div className="w-full  mt-4 p-2 rounded-xl bg-blue-600">
                                    <button onClick={handleAddField} className="w-full text-md">
                                        + Add Item
                                    </button>
                                </div>


                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
            <div className=' preview-section w-[50%] flex flex-col justify-center items-center'>
                <h1 className='text-2xl p-2'>JSON Schema Preview</h1>
                <Card className={"p-6 w-[100%]"}>

                    <CardContent>
                        <pre className="text-green-700">
                            {formFields.length === 0 ? '{}' : JSON.stringify(jsonSchema, null, 2)}
                        </pre>

                    </CardContent>


                </Card>

            </div>

        </div>
    )
}

export default JsonBuilder
