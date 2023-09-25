export default function Form({ showInput, value, setValue, treeSubmit }) {
  return (
    <>
    {showInput && (
          <form className=' bg-[#0E1525]' onSubmit={treeSubmit}>
            <input 
              className='bg-[#1D2332] focus:outline-none hover:bg-[#2B3245] h-8 rounded-md  my-0.5 placeholder:pl-2 text-white' 
              placeholder='Filename' 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        )}
    </>
  )
}
