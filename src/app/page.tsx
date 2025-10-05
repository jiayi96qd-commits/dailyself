export default function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 leading-tight">
        在日常中，与自我温柔对话
      </h1>
      <p className="text-gray-600 mb-8 text-sm sm:text-base max-w-2xl">
        Dailyself · 自由仪式，一个关于生活节奏、感知与系统的个人基地。
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
        <a href="/scene" className="hover:text-brand-scene transition-colors py-2 px-4 rounded hover:bg-gray-50">
          Scene
        </a>
        <a href="/sense" className="hover:text-brand-sense transition-colors py-2 px-4 rounded hover:bg-gray-50">
          Sense
        </a>
        <a href="/system" className="hover:text-brand-system transition-colors py-2 px-4 rounded hover:bg-gray-50">
          System
        </a>
      </div>
    </section>
  );
}
