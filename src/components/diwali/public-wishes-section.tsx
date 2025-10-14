import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { PublicWish } from '@/lib/public-wishes';
import { ArrowRight } from 'lucide-react';

type PublicWishesSectionProps = {
  wishes: PublicWish[];
};

export default function PublicWishesSection({ wishes }: PublicWishesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {wishes.map((wish) => {
        const params = new URLSearchParams({
            name: wish.name,
            recipient: wish.recipient,
            relationship: wish.relationship,
            wish: wish.wish,
            animation: wish.animation,
            bgImageId: wish.bgImageId
        });
        
        return (
          <Link href={`/wish?${params.toString()}`} key={wish.id}>
            <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 group bg-card/50 hover:bg-card/90 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">
                  For {wish.recipient}
                </CardTitle>
                <CardDescription>From {wish.name} ({wish.relationship})</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground line-clamp-3">
                  "{wish.wish}"
                </p>
              </CardContent>
              <CardFooter>
                 <p className="text-sm font-bold text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                     View Wish <ArrowRight className="h-4 w-4" />
                 </p>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
