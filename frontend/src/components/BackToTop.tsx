import { MdArrowUpward } from 'react-icons/md'

const BackToTop = () => {
    const scrollToTop = (): void => {
        window.scroll(0,0)
    }

  return (
    <button className='flex justify-center items-center rounded-full 
    h-[3rem] w-[3rem] 
    bg-100 fixed right-3 bottom-3 m-5 opacity-35 hover:opacity-100'
    onClick={scrollToTop}
    >
        <MdArrowUpward className='text-2xl font-bold text-white'/>
    </button>
  )
}

export default BackToTop