import { ChevronRight } from "lucide-react";
import MapComponent from "./components/MapComponent";

function App() {

 return (
  <main className="w-full min-h-screen bg-gray-100">
    
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
        justify-start 
        items-center 
        pt-8
        gap-6
        relative
        z-10
      "
    >
      <h1 className="text-3xl font-bold text-white">
        Rastreador de Endereço IP
      </h1>

      <div className="relative w-full max-w-lg flex items-center mb-4">
        <input 
          type="text" 
          placeholder="Digite o endereço IP" 
          className="w-full max-w-lg h-14 rounded-xl pl-5 pr-16 border border-white bg-white text-gray-800 text-base focus:outline-none"
        />
        <button className="flex items-center justify-center absolute right-0 bottom-0 top-0 px-6 rounded-r-xl bg-gray-900 hover:bg-gray-700 transition-colors focus:border-gray-400">
          <ChevronRight className="text-white w-5 h-5" />
        </button>
      </div>

      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 w-full flex justify-center px-4 z-20">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
            
            <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-300 md:pr-8">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">endereço IP</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">192.212.174.101</span>
            </div>

            <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-300 md:px-8">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Localização</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
                Brooklyn, NY <br className="hidden md:inline" /> 10001
              </span>
            </div>

            <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-300 md:px-8">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Fuso horário</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">UTC -05:00</span>
            </div>

            <div className="flex flex-col items-center md:items-start md:pl-8">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">ISP</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">SpaceX Starlink</span>
            </div>

          </div>
        </div>
      </div>

    </section>

    
    <section className="w-full flex-1 bg-gray-200 min-h-[400px] z-0">
      <MapComponent lat={40.650002} lng={-73.949997} />
    </section>
   
  </main>
)
}

export default App