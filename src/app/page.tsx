import Header from '@/components/diwali/header';
import Footer from '@/components/diwali/footer';
import WishFormCard from '@/components/diwali/wish-form-card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
        <section id="create" className="text-center w-full">
          <h1 className="text-4xl md:text-6xl font-headline font-black text-primary mb-4 animate-fade-in-down">
            દિવાળી શુભેચ્છાઓ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up">
            તમારા મિત્રો અને પરિવાર માટે સુંદર, વ્યક્તિગત દિવાળી શુભેચ્છાઓ બનાવો અને શેર કરો. તમારા તરફથી એક વિશેષ સંદેશ સાથે પ્રકાશના તહેવારને વધુ તેજસ્વી બનાવો.
          </p>
          <WishFormCard />
        </section>
      </main>
      <Footer />
    </div>
  );
}
