import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function Hero() {
  return (
    <section className="py-20 px-6 bg-gray-100 text-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Schedule Your Crypto Transactions with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            CryptoCalendar helps you plan and automate your cryptocurrency
            transactions, ensuring you never miss an opportunity in the market.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-200 transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            isZoomed
            src="/assets/hero-calendar.webp"
            alt="CryptoCalendar Dashboard"
            width={600}
            height={400}
            className="rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
