"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createWishAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Wand2, Copy, Link as LinkIcon, PartyPopper } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  name: z.string().min(2, "કૃપા કરીને તમારું નામ દાખલ કરો.").max(50),
});

type FormValues = z.infer<typeof formSchema>;

type WishResult = {
  wish: string;
  name: string;
};

export default function WishFormCard() {
  const [wishResult, setWishResult] = useState<WishResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animation, setAnimation] = useState('diya');
  const [bgImageId, setBgImageId] = useState('');
  const [shareLink, setShareLink] = useState('');
  const { toast } = useToast();

   useEffect(() => {
    if (PlaceHolderImages.length > 0) {
      setBgImageId(PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)].id);
    }
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setWishResult(null);
    setShareLink('');
    const fullData = {
        name: data.name,
        relationship: 'Friend',
    }
    const result = await createWishAction(fullData);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "અરે નહિ! કંઇક ખોટું થયું.",
        description: result.error,
      });
    } else if (result.wish) {
      const newWishResult = { name: data.name, wish: result.wish };
      setWishResult(newWishResult);
      generateShareLink(newWishResult, animation, bgImageId);
      toast({
        title: "તમારી શુભેચ્છા તૈયાર છે!",
        description: "હવે તમે તેને કસ્ટમાઇઝ કરી શકો છો અને શેર કરી શકો છો.",
      });
      document.getElementById('wish-preview')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const generateShareLink = (currentWish: WishResult, currentAnimation: string, currentBgImageId: string) => {
    if (!currentWish) return;
    const params = new URLSearchParams({
        name: currentWish.name,
        wish: currentWish.wish,
        animation: currentAnimation,
        bgImageId: currentBgImageId,
    });
    const link = `${window.location.origin}/wish?${params.toString()}`;
    setShareLink(link);
    return link;
  };
  
  useEffect(() => {
    if (wishResult) {
      generateShareLink(wishResult, animation, bgImageId);
    }
  }, [wishResult, animation, bgImageId]);


  const handleCopyLink = () => {
    if(shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: "લિંક કૉપિ થઈ ગઈ!",
        description: "તમારી દિવાળીની શુભેચ્છા શેર કરવા માટે તૈયાર છે.",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-2 border-accent/30">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2 justify-center">
          <Wand2 className="text-accent" /> તમારી વ્યક્તિગત શુભેચ્છા બનાવો
        </CardTitle>
        <CardDescription className="text-center">
          AI વડે એક અનોખી, શેર કરી શકાય તેવી શુભેચ્છા જનરેટ કરવા માટે તમારું નામ દાખલ કરો.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>તમારું નામ</FormLabel>
                  <FormControl>
                    <Input placeholder="દા.ત., પ્રિયા" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  જનરેટ થઈ રહ્યું છે...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  મારી શુભેચ્છા બનાવો
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {wishResult && (
        <div id="wish-preview" className="border-t-2 border-accent/30 mt-6 pt-6">
          <CardHeader>
             <CardTitle className="text-2xl font-headline flex items-center gap-2 justify-center">
                <PartyPopper className="text-accent" />
                તમારી શુભેચ્છા તૈયાર છે!
            </CardTitle>
            <CardDescription>
                અહીં તમારી વ્યક્તિગત શુભેચ્છા છે. કસ્ટમાઇઝ કરો અને શેર કરો!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-muted p-6 rounded-lg text-center space-y-4">
                <p className="text-lg italic text-foreground/90">"{wishResult.wish}"</p>
                <div className="bg-background/50 p-4 rounded-lg flex flex-col md:flex-row items-center gap-4">
                  <LinkIcon className="h-6 w-6 text-primary shrink-0" />
                  <input type="text" readOnly value={shareLink} className="w-full bg-transparent text-sm text-muted-foreground truncate" />
                  <Button onClick={handleCopyLink} className="w-full md:w-auto shrink-0">
                      <Copy className="mr-2 h-4 w-4" />
                      લિંક કૉપિ કરો
                  </Button>
                </div>
            </div>
            
            <div className="space-y-4">
                <Label className="text-lg font-bold font-headline">એક એનિમેશન પસંદ કરો</Label>
                <RadioGroup value={animation} onValueChange={setAnimation} className="flex gap-4">
                    <Label className="flex items-center gap-2 border rounded-lg p-3 flex-1 cursor-pointer has-[:checked]:bg-accent/20 has-[:checked]:border-accent">
                        <RadioGroupItem value="diya" /> દિવો
                    </Label>
                     <Label className="flex items-center gap-2 border rounded-lg p-3 flex-1 cursor-pointer has-[:checked]:bg-accent/20 has-[:checked]:border-accent">
                        <RadioGroupItem value="firecrackers" /> ફટાકડા
                    </Label>
                </RadioGroup>
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
}
