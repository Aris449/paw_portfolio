import Image from 'next/image'
import Link from 'next/link'
import { ScaleAnimationWrapper } from './Animations';
import ThemeToggle from './ThemeToggle';


const Header = () => {
  const headerItem = [
    { id:1, imagePath:"/home-icon.png", title:"Home", linkPath:"/" },
    { id:2, imagePath:"/about-icon.png", title:"About", linkPath:"/about" },
    { id:3, imagePath:"/works-icon.png", title:"Works", linkPath:"/works" },
    { id:4, imagePath:"/contact-icon.png", title:"Contacts", linkPath:"/contacts" },
    { id:5, imagePath:"/comments-icon.png", title:"Comms", linkPath:"#"},
  ];


  return (
    <header className='h-[100px]'>
      <div className='flex justify-between p-4'>


        <ScaleAnimationWrapper>
        <ThemeToggle/>
        </ScaleAnimationWrapper>

          <ScaleAnimationWrapper style='w-96 flex justify-between'>
          {headerItem.map((item, index) => (
            <div
              key={item.id}
              className='flex flex-col items-center cursor-pointer'
            >
              <Link href={item.linkPath}>
                <Image src={item.imagePath} alt={item.title} width={60} height={60}/>
              </Link>
              <span className='text-base'>{item.title}</span>
            </div>
          ))}
          </ScaleAnimationWrapper>
        <Image src="/user.png" alt='user' width={50} height={50} className="flex-none self-start"/>
      </div>
    </header>
  )
}

export default Header
