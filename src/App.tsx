import { ChevronRight } from "lucide-react";

function App() {

  return (
   <main className="w-full min-h-screen">
    <section 
      className="
        bg-[url('/imagem-cabecalho.png')]
        w-full 
        h-[280px] 
        px-4
        md:px-10
        lg:px-20
        bg-no-repeat 
        bg-cover 
        bg-center 
        text-center 
        flex 
        flex-col 
        justify-center 
        items-center 
        gap-3
        "
      >

      <h1 
        className="
          text-3xl 
          font-bold
          text-white 
          "
        >
        Rastreador de Endereço IP
      </h1>

      <div 
        className=" 
          relative 
          w-full 
          max-w-lg 
          flex 
          items-center"
        >

        <input 
          type="text" 
          placeholder="Digite o endereço IP" 
          className=" 
          w-full 
          max-w-lg 
          h-12 
          rounded-lg 
          pl-4 
          pr-14
          border
           border-white
           bg-white
           text-gray-500 
           focus:outline-none "
        />

        <button 
          className="
            flex 
            items-center 
            justify-center
            absolute 
            right-0
            bottom-0
            top-0
            px-4 
            rounded-r-lg
           bg-blue-950"
          >
          <ChevronRight 
            className="
             text-white  
             w-6 h-12" 
          />
        </button>

      </div>
      
    </section>

    <section className="flex ">
     <div className='flex items-center justify-center gap-3'>

     </div>
      <div>
      
     </div>
      <div>
      
     </div>
    </section>
   
   </main>
  )
}

export default App