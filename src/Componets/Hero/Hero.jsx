import { IoWallet } from "react-icons/io5";
import HeroImg from "../../../public/Hero-Img/HeroImg.png";

export function Hero() {
  return (
    <div className="Hero bg-white dark:bg-gray-900">
      <div className="container_1200 flex flex-col items-center justify-between gap-6 px-4 py-6 md:flex-row md:gap-8 md:py-0">
        <div className="Left w-full md:w-1/2 md:max-w-[550px]">
          <img src={HeroImg} alt="Cashback" className="h-auto w-full" />
        </div>

        <div className="Right w-full text-center md:w-1/2 md:max-w-[550px] md:text-left">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-red-500 sm:text-4xl">
              CASHBACK
            </h1>
            <h2 className="text-2xl font-light tracking-wide text-black dark:text-white sm:text-3xl">
              ОТ КАЖДОЙ ПОКУПКИ
            </h2>
          </div>

          <div className="mt-6 flex flex-col items-center gap-5 md:mt-10 md:flex-row md:gap-10">
            <p className="text-xl font-normal leading-tight text-black dark:text-white sm:text-2xl lg:text-3xl">
              Теперь покупки стали <br />
              ещё более <strong className="font-bold">выгодными</strong>
            </p>

            <div className="flex shrink-0 items-center gap-3">
              <IoWallet color="red" className="h-11 w-11 sm:h-[55px] sm:w-[55px]" />
              <span className="text-xl font-bold leading-tight text-red-600 sm:text-2xl">
                Cash <br /> Back
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}