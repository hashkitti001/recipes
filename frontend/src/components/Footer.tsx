import { GrGithub } from "react-icons/gr"

const Footer = () => {
    return (
        <footer className='bg-black'>

            <div className="p-8 flex gap-4 justify-center align-center">
                <p className='text-white text-2xl text-center'>&copy; 2024 hashkitti </p>
                <a href='https://github.com/hashkitti001'>
                    <GrGithub className="text-4xl text-white" />
                </a>
            </div>
        </footer>
    )
}

export default Footer