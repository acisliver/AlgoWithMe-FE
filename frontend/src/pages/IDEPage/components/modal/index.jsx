import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModalMenu_Btn from './ModalMenu_Btn';

const style = {
   
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 600,
    bgcolor: '#25283D',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white' ,
    borderRadius:'21px',

};
const projects = [
    {
        id: 1,
        name: "네카라쿠배 webIDE Project",
        date: "2023-09-25",
        collaborators: ["김지민", "장원영","안유진"]
    },
    {
        id: 2,
        name: "New Project",
        date: "2023-08-20",
        collaborators: ["박지영", "김민수", "최하늘"]
    },
    {
        id: 3,
        name: "프로젝트 C",
        date: "2023-07-15",
        collaborators: ["정태영", "황미나"]
    }

];


export default function Index({onProjClick}) {
    const [open, setOpen] = React.useState(true);
    const [modal,setModal] =React.useState(false);
    const [pjtName, setPjtName] = React.useState('');
    const [pjtTextAreaValue, setPjtTextAreaValue] = React.useState('');


    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen((prev)=>!prev);
        onProjClick(false)
    }

    const createModal= ()=>{
        setModal((prev)=>!prev);
    }
   
    // const createClose = ()=>{
    //     setModal(false);
    //       onProjClick(false)
    // } 
    const handleBack = () =>{
        setModal(false);
    }
    const handlePjtNameChange = (e)=>{
        setPjtName(e.target.value)
    }

    const nameSubmit = (e) =>{
        e.preventDefault();
    }
    const handleTextAreachange = (e) =>{
        setPjtTextAreaValue(e.target.value)
    }

    const pjtDescriptionSubmit = (e) => {
         e.preventDefault();
    } 

   

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title"  variant="h6" component="div" className='flex pr-1' onClick={()=>{handleClose();}}>
                        <button className='bg-[#FF524E] my-1 grow-0' style={{padding : '5px',borderRadius:'50%'}}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                        <div className='flex grow justify-around mr-9'>
                            <span>Project Title</span>
                            <span>Updated Date</span>
                            <span>Collaborator</span>
                        </div>
                    </Typography>
                    <hr className='mt-3'/>
                    <Typography id="modal-modal-description" component="div"  sx={{ my: 2}} style={{height : '430px'}}>
                     {projects.map((project)=>(
                        <div key={project.id} className='flex  py-4 hover:bg-[#46425e] ' style={{paddingLeft:'30px',fontSize:'22px'}}>
                                <div style={{width:'70px'}}>icon</div>
                                <span style={{width:'460px'}}>{project.name}</span>
                                <span style={{width:'150px'}} className='flex justify-center' >{project.date}</span>
                                <span style={{width:'360px', marginLeft:'150px'}}>{project.collaborators}</span>
                                <ModalMenu_Btn/>
                        </div>
                            ))}
                    </Typography>
                    <div className='w-full flex justify-center '>
                    <button className='bg-white px-5 py-1 rounded-2xl' onClick={createModal} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </button>
                        {modal && 
                        <div>
                             <Modal
                                open={modal}
                                // onClose={createClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="div" className='flex' style={{height:'500px'}} >
                                        <div className=' bg-white text-black rounded-2xl p-4' style={{width : '230px', height:'475px'}}>Language</div>
                                        <div style={{width:'1000px', color:'black', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                            <form onSubmit={nameSubmit} >
                                                <input
                                                className='bg-[#D9D9D9] mb-10 pl-3 rounded-xl focus:outline-none' style={{width:'500px'}} 
                                                    type="text" 
                                                    value={pjtName} 
                                                    onChange={handlePjtNameChange} 
                                                    placeholder="프로젝트 이름" 
                                                />
                                            </form>
                                            <form onSubmit={pjtDescriptionSubmit} >
                                                <textarea 
                                                className='bg-[#D9D9D9] mb-10 pl-3 rounded-xl focus:outline-none' style={{width:'500px',height: '400px'}}
                                                    value={pjtTextAreaValue} 
                                                    onChange={handleTextAreachange} 
                                                    placeholder="프로젝트 설명 " 
                                                />
                                            </form>
                                         </div>
                                    </Typography>
                                   
                                    <div className='w-full flex justify-between'>
                                    <button className='py-1 px-5 bg-white text-black rounded-2xl' onClick={handleBack}>
                                        Back
                                    </button>
                                    <button  className='py-1 px-4 bg-white text-black rounded-2xl'>
                                        Create
                                    </button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                         }
                    </div>
                </Box>
                
            </Modal>
        </div>
    );
}