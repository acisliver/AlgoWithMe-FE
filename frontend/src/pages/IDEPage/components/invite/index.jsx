import React, {useState} from 'react';
import Switch from '@mui/material/Switch'

const Index = () => {

    const [email, setEmail] = useState("");
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const changeHandler = (event)=>{
        setEmail(event.target.value);
    }

    return <div className="bg-[#2B3244] w-[400px] h-[300px] rounded-2xl border-[#8E9DC7] border-2 flex flex-col justify-between">
        <div>
            <h2 className="text-white py-1 px-2 text-[18px] font-bold">Collaborators</h2>
            <div className="flex-none flex items-center relative py-2 px-2">
                <input
                    type="text"
                    placeholder="Add people by email"
                    className="text-white py-1 px-2 w-full bg-[#565F7A] rounded-xl flex-none border-2 border-[#8E9DC7]"
                    value={email}
                    onChange={changeHandler}
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent rounded-lg px-4"

                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="white"
                        className="bi bi-send-plus"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                        <path
                            d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div>
            <p className="text-[#C2C8CC] text-center">No one else is here</p>
        </div>
        <div className="flex items-center justify-evenly">
            <div className="text-[#D3D3D3]">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                     className="bi bi-globe" viewBox="0 0 16 16">
                    <path
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                </svg>
            </div>
            <div>
                <p className="text-[18px] text-[#D6DADD]">Make this project Public<br /><span className="text-[14px] text-[#8A8E90]">Anyone with this link can edit</span></p>
            </div>
            <div>
                <Switch {...label} />
            </div>
        </div>
    </div>
}

export default Index;