import { useEffect, useState } from "react";

import { Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import MapComponent from "./components/MapComponent";

import {findLocation,getRandomLocation} from "./data/mockData";

import type { MockLocation } from "./data/mockData";

function App() {

  const [searchQuery, setSearchQuery] = useState(""); 
  const [ipData, setIPData] = useState<MockLocation | null>(null);
  const [aiText, setAiText] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialData = getRandomLocation();

    setIPData(initialData);

    setAiText(
      `Olá! Atualmente estou mostrando dados simulados da cidade de
      ${initialData.location.city}. 
      Pesquise uma cidade, país, ISP ou IP fictício para explorar o mapa.`
    );
  }, []);

  const handleSearch = async () => {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;  

    const query = searchQuery.trim();
    if (!query) return;
    setIsLoading(true);
    setIsAiModalOpen(true);

    try {
      const result = findLocation(query);

      if (!result) {
        setAiText(
         "Não encontrei essa localização..."
        );
        return;
      } setIPData(result);

      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
        Você é um professor especialista em Redes.

        Dados da localização:
          Cidade: ${result.location.city}
          País: ${result.location.region}
          IP: ${result.ip}
          ISP: ${result.isp}
          Fuso horário: UTC ${result.location.timezone}

        Explique:

        1. Como funciona a internet nessa região.

        2. Qual a infraestrutura.

        3. Cabos submarinos.

        4. Como um pacote chega até essa cidade.

        5. Curiosidades.

       Responda em português.
     `;
      const response = await model.generateContent(prompt);

      setAiText(response.response.text());

    } catch (error) {
        console.error(error);
        setAiText(
         "Ocorreu um erro ao consultar a IA."
        );

      } finally {
         setIsLoading(false);
       }
  };

  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <section
        className="
          bg-[url('/pattern-bg-mobile.png')] 
          md:bg-[url('/pattern-bg-desktop.png')]
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
        <h1 className="text-2xl md:text-3xl font-medium text-white">
          Rastreador Inteligente de IPs
        </h1>

        <div className="relative w-full max-w-lg flex items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="O que você quer buscar? (IP, endereço ou dúvida)"
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
              focus:outline-none
            "
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
              rounded-r-lg
              bg-black
              hover:bg-gray-800
              transition-colors
              cursor-pointer
              h-full
            "
          >
            <Bot className="w-6 h-6 text-white" />
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
              px-6 py-6 
              flex 
              flex-col 
              items-center 
              gap-3">
            <div 
              className="
                grid grid-cols-1 
                md:grid-cols-4 
                gap-6 md:gap-0 
                w-full">
              <div 
                className="
                  flex flex-col 
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
                  IP Address
                </span>
                <span 
                  className="
                    text-xl 
                    md:text-2xl 
                    font-bold 
                    text-gray-800">
                  {ipData?.ip || "Rastreando..."}
                </span>
              </div>

              <div 
                className="
                  flex flex-col 
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
                    text-center md:text-left">
                  {ipData ? (
                    <>
                      {ipData.location?.city}, {ipData.location?.region}
                      <br className="hidden md:inline" /> {ipData.location?.postalCode}
                    </>
                  ) : (
                    "Rastreando..."
                  )}
                </span>
              </div>

              <div 
                className="
                  flex flex-col 
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
                <span className="text-xl md:text-2xl font-bold text-gray-800">
                  {ipData ? `UTC ${ipData.location?.timezone}` : "Rastreando..."}
                </span>
              </div>

              <div 
                className="
                  flex flex-col 
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
                <span className="text-xl md:text-2xl font-bold text-gray-800">
                  {ipData?.isp || "Rastreando..."}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="
                mt-2 text-xs 
                font-bold 
                text-purple-600 
                hover:text-purple-800 
                uppercase 
                tracking-wider 
                flex items-center 
                gap-1 
                transition-colors 
                cursor-pointer"
            >
              <span>✨ Saber mais detalhes com IA</span>
            </button>
          </div>
        </div>
      </section>
     
      <section className="w-full flex-1 z-0">
        {ipData?.location?.lat && ipData?.location?.lng ? (
          <MapComponent
            lat={ipData.location.lat}
            lng={ipData.location.lng}
          />
        ) : (
          <div 
            className="
              w-full 
              h-full 
              min-h-[calc(100vh-280px)] 
              flex items-center 
              justify-center 
              text-gray-500 
              bg-gray-200">
            Sincronizando mapa em tempo real...
          </div>
        )}
      </section>

      {isAiModalOpen && (
        <div 
          className="
            fixed 
            inset-0 
            bg-black/50 
            backdrop-blur-sm 
            z-50 
            flex 
            items-center 
            justify-center 
            p-4">
          <div 
            className="absolute inset-0" 
            onClick={() => !isLoading && setIsAiModalOpen(false)} />

          <div 
            className="
              relative 
              bg-white 
              w-full 
              max-w-lg 
              rounded-3xl 
              shadow-2xl 
              px-6 pb-8 pt-12 
              text-center 
              flex 
              flex-col 
              items-center 
              gap-4">
            
            <div 
              className="
                absolute 
                top-0 
                -translate-y-1/2 
                w-20 h-20 
                bg-purple-600 
                rounded-full 
                flex 
                items-center 
                justify-center 
                border-4 
                border-white 
                shadow-lg 
                text-white">
              <Bot 
                className={`w-10 h-10 ${isLoading ? 'animate-spin' : 'animate-pulse'}`} 
              />
            </div>

            <div 
              className="
                flex 
                flex-col 
                gap-1 
                w-full">
              <h3 
                className="
                  text-purple-600 
                  font-bold 
                  text-xs 
                  uppercase 
                  tracking-widest">
                ✨ Insight do Professor IA
              </h3>
              <p className="text-xl font-bold text-gray-800">
                {isLoading ? "Analisando dados globais..." : "Análise Concluída!"}
              </p>
            </div>

            <div 
              className="
                text-gray-600 
                text-sm 
                leading-relaxed 
                h-auto 
                max-h-[300px] 
                overflow-y-auto 
                px-2 
                text-left 
                md:text-center 
                w-full">
              {isLoading ? (
                <div 
                  className="
                    flex 
                    flex-col 
                    items-center 
                    gap-2 
                    text-gray-400 
                    py-4">
                  <span>Consultando tabelas de roteamento e infraestrutura...</span>
                </div>
              ) : (
                aiText
              )}
            </div>

            {!isLoading && (
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="
                  mt-2 
                  w-full 
                  sm:w-auto 
                  bg-gray-900 
                  hover:bg-gray-800 
                  text-white 
                  font-medium 
                  text-sm 
                  px-6 
                  h-11 
                  rounded-xl 
                  transition-colors 
                  cursor-pointer"
              >
                ← Voltar para o Mapa
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
export default App;
