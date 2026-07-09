import { Bot } from 'lucide-react'
import MapComponent from "./components/MapComponent";
import {useState, useEffect} from 'react';

// Default mock data
const defaultData = {
  ip: "192.212.174.101",
  location: {
    city: "Brooklyn",
    region: "NY",
    postalCode: "10001",
    timezone: "-05:00",
    lat: 40.7128,
    lng: -74.0060
  },
  isp: "SpaceX Starlink"
}

function App() {
 const[searchIP, setSearchIP] = useState('')
 const[ipData, setIPData] = useState<any>(null)

 const handleSearch = () => {
  const trimmedIP = searchIP.trim()
  setSearchIP(trimmedIP)
  getIPData(trimmedIP)

 }
 async function getIPData(ip: string){
  const apiKey = import.meta.env.VITE_IPIFY_API_KEY
  try {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`)
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const data = await response.json()
    setIPData(data)
  } catch (error) {
    console.error("Erro ao buscar dados do IPify:", error)
    setIPData(null) 
  }
  
 }
 useEffect(() => {
   getIPData('');
 }, [])

 return (
  <main 
    className="
      w-full 
      min-h-screen 
      flex
      flex-col
      bg-gray-100"
    >
    <section 
      className="
        bg-[url('/pattern-bg-mobile.png')] md:bg-[url('/pattern-bg-desktop.png')]
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
      <h1 
        className="
          text-3xl 
          font-bold 
          text-white"
        >
        Rastreador Inteligente de IPs
      </h1>

      <div 
        className="
          relative 
          w-full 
          max-w-lg 
          flex 
          items-center 
          mb-4"
        >
        <input 
          type="text" 
          value={searchIP}
          onChange={(e) => setSearchIP(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') handleSearch() }}
          placeholder="O que voce quer buscar?" 
          className="
            w-full 
            max-w-lg 
            h-14 
            rounded-lg 
            pl-5 
            pr-16 
            border 
            border-white 
            bg-white 
            text-gray-800 
            text-base 
            focus:outline-none"
        />
        <button 
         onClick={handleSearch}
          className="
            flex 
            items-center 
            justify-center 
            absolute 
            right-0 
            bottom-0 
            top-0 
            px-6 
            rounded-lg
            bg-black 
            hover:bg-gray-800 
            transition-colors 
            cursor-pointer"
        >
          <Bot className="w-5 h-5 text-white"/>
        </button>
        
      </div>

      <div 
        className="
          absolute 
          left-0 
          right-0 
          bottom-0 
          translate-y-1/2 
          w-full 
          flex 
          justify-center 
          px-4 z-20">

        <div 
          className="
           w-full 
           max-w-5xl 
           bg-white 
           rounded-2xl 
           shadow-xl 
           px-6 py-8">

          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-4 
              gap-8 
              md:gap-0">
            
            <div 
              className="
                flex 
                flex-col 
                items-center 
                md:items-start 
                md:border-r 
                md:border-gray-300 
                md:pr-8">

              <span 
                className="
                text-xs 
                font-semibold 
                text-gray-500 
                uppercase 
                tracking-widest 
                mb-2">
                Endereço IP
              </span>

              <span 
                className="
                  text-xl 
                  md:text-2xl 
                  font-bold 
                  text-gray-800">
                {ipData?.ip || "Loading..."}
              </span>
            </div>

            <div 
              className="
                flex 
                flex-col 
                items-center 
                md:items-start 
                md:border-r 
                md:border-gray-300 
                md:px-8">

              <span 
                className="
                  text-xs 
                  font-semibold 
                  text-gray-500 
                  uppercase 
                  tracking-widest 
                  mb-2">
                Localização
              </span>

              <span 
                className="
                text-xl 
                md:text-2xl 
                font-bold 
                text-gray-800 
                text-center 
                md:text-left">
               {ipData ? (
               <>
                 {ipData.location?.city}, {ipData.location?.region}
                 <br className="hidden md:inline" /> {ipData.location?.postalCode}
               </>
               ) : (
                 "Loading..."
               )}
              </span>

            </div>

            <div 
              className="
                flex 
                flex-col 
                items-center 
                md:items-start 
                md:border-r 
                md:border-gray-300 
                md:px-8">

              <span 
                className="
                  text-xs 
                  font-semibold 
                  text-gray-500 
                  uppercase 
                  tracking-widest 
                  mb-2">
                Fuso Horário
              </span>

              <span 
                className="
                  text-xl 
                  md:text-2xl 
                  font-bold 
                  text-gray-800">
                {ipData ? `UTC ${ipData.location?.timezone}` : "Loading..."}
              </span>

            </div>

            <div 
              className="
                flex 
                flex-col 
                items-center 
                md:items-start 
                md:pl-8">
              <span 
                className="
                  text-xs 
                  font-semibold 
                  text-gray-500 
                  uppercase 
                  tracking-widest 
                  mb-2">
                ISP
              </span>

              <span 
                className="
                  text-xl 
                  md:text-2xl 
                  font-bold 
                  text-gray-800">
                {ipData?.isp || "Loading..."}
              </span>

            </div>

          </div>
        </div>
      </div>

    </section>

    <section 
      className="
        w-full 
        flex-1 
        bg-gray-200 
        min-h-[calc(100vh-280px)] 
        z-0">
      <MapComponent 
        lat={ipData?.location?.lat} 
        lng={ipData?.location?.lng} 
      />
    </section>
   
  </main>
)
}

export default App