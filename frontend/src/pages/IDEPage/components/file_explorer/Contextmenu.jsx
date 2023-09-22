import { Menu, Item, Separator } from "react-contexify";
import "react-contexify/ReactContexify.css"
import './Contextmenu.css'
import {GoPencil}  from 'react-icons/go' 
import {RiDeleteBinLine} from 'react-icons/ri' 


export default function Contextmenu({setEditing}) {

  return (
    <Menu id="menu-id" >
   <Item onClick={() => setEditing(true)}><GoPencil size='21' className="pr-2"/>Rename</Item>
      <Separator/>
      <Item onClick={() => alert('삭제 클릭!')}><RiDeleteBinLine size='22' color="#c22424" className="pr-2" />Delete</Item>
    </Menu>
  )
}
