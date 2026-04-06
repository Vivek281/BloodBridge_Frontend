import { useController } from "react-hook-form";
import type { BaseSyntheticEvent } from "react"

export interface IFormInputProps {
    name: string,
    //eslint-disable-next-line
    control: any,
    type?: string,
    placeholder?: string
    errMsg?: string
    className?: string
}

export interface ISingleOption {
    label: string,
    value: string
}

export interface IFormSelectProps {
    name: string,
    //eslint-disable-next-line
    control: any,
    errMsg?: string,
    options: Array<ISingleOption>
}

export interface IFileInputProps {
    name: string;
    // eslint-disable-next-line
    control: any;
    className?: string;
    id?:string;
    isMultiple?: boolean,
    errMsg?: string;
  }



export const FormInput = ({ name, control, type = "text", className = '', placeholder = "", errMsg = '' }: Readonly<IFormInputProps>) => {
    const { field } = useController({
        name: name,
        control: control,
    });
    return (
        <>
            <input type={type}
                {...field}
                placeholder={placeholder}
                className={`${className} w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-rose-500 outline-none transition-all placeholder:text-slate-400`}
            />
            <span className="text-sm italic text-red-600 dark:text-red-300">
                {errMsg}
            </span>
        </>
    );
};

export const FormSelect = ({ name, control, options, errMsg = '' }: Readonly<IFormSelectProps>) => {
    const { field } = useController({
        name: name,
        control: control,
    });
    return (
        <>
            <select
                {...field}
                className="w-full pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-rose-500 outline-none transition-all appearance-none cursor-pointer">
                <option value="" disabled hidden>Select</option>
                {
                    options && options.map((row: ISingleOption, ind: number) => {
                        return <option key={ind} value={row.value}>
                            {row.label}
                        </option>
                    })
                }
            </select>
            <span className="text-sm italic text-red-600 dark:text-red-300">
                {errMsg}
            </span>
        </>
    );
};

export const FileInput = ({ name, control, isMultiple = false, errMsg = '', className = '', id='' }: Readonly<IFileInputProps>) => {
    const { field } = useController({
        name: name,
        control: control,
    });
    return (
        <>
            <input
                type='file'
                multiple={isMultiple}
                onChange={(e: BaseSyntheticEvent) => {
                    let { files } = e.target
                    files = Object.values(files)      // {0: {},1: {}, 2: {}} => [{}, {}, {}], {}

                    if (isMultiple) {
                        field.onChange(files);
                    } else {
                        field.onChange(files[0])
                    }
                }}
                id = {id}
                className={`${className} text-gray-800 border border-gray-700 dark:border-gray-600 dark:bg-gray-400 w-full rounded-md p-2 dark:placeholder:text-gray-700 placeholder:italic`}
            />
            <span className="text-sm italic text-red-600 dark:text-red-300">
                {errMsg}
            </span>
        </>
    );
};