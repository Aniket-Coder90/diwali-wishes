"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/diwali/header';
import Footer from '@/components/diwali/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import DiyaAnimation from '@/components/diwali/animations/diya-animation';
import FirecrackersAnimation from '@/components/diwali/animations/rangoli-animation';

function WishPageContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || 'એક મિત્ર';
    const wish = searchParams.get('wish') || 'તમને દિવાળીની ખૂબ ખૂબ શુભેચ્છાઓ!';
    const animation = searchParams.get('animation');
    const bgImageId = searchParams.get('bgImageId');

    const bgImage = PlaceHolderImages.find(img => img.id === bgImageId);

    return (
        <div className="relative flex flex-col min-h-dvh bg-background text-foreground overflow-hidden">
            {bgImage && (
                <Image
                    src={bgImage.imageUrl}
                    alt={bgImage.description}
                    fill
                    className="object-cover z-0 opacity-20"
                    data-ai-hint={bgImage.imageHint}
                />
            )}
            
            {animation === 'diya' && <DiyaAnimation />}
            {animation === 'firecrackers' && <FirecrackersAnimation />}
            
            <div className="relative z-10 flex flex-col flex-grow">
                <Header />
                <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-16">
                    <div className="bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl text-center border-2 border-accent/50">
                        <h1 className="text-3xl md:text-5xl font-headline font-black text-primary mb-4">
                            દિવાળીની શુભકામનાઓ!
                        </h1>
                        <p className="text-lg md:text-2xl text-foreground/90 my-8 leading-relaxed">
                            &ldquo;{wish}&rdquo;
                        </p>
                        <p className="text-xl md:text-3xl font-headline font-bold text-primary mt-8">
                            પ્રેમથી,
                            <br />
                            {name}
                        </p>
                        <div className="mt-12">
                            <Button asChild size="lg">
                                <Link href="/">
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    તમારી પોતાની શુભેચ્છા બનાવો
                                </Link>
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default function WishPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">તમારી સુંદર શુભેચ્છા લોડ થઈ રહી છે...</div>}>
            <WishPageContent />
        </Suspense>
    );
}
