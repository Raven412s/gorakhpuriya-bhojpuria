"use client";

import { IndianRupee } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const presetAmounts = [101, 251, 501, 1001];

  const handlePresetAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            भोजपुरी के आगे बढ़ावे में आपन सहयोग करीं
          </h1>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed">
            हमनी के ई अभियान आपके सहयोग के बिना अधूरा बा। आप दू तरीका से हमनी के साथ दे सकीला: 
            आर्थिक सहयोग दे के भा हमनी के समुदाय से जुड़ के।
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="financial" className="text-lg py-3">
              आर्थिक सहयोग
            </TabsTrigger>
            <TabsTrigger value="membership" className="text-lg py-3">
              सदस्यता सहयोग
            </TabsTrigger>
          </TabsList>

          {/* Financial Support Tab */}
          <TabsContent value="financial">
            <Card className="border-2 border-amber-200 shadow-lg">
              <CardHeader className="text-center bg-amber-50 rounded-t-lg">
                <CardTitle className="text-2xl text-amber-900">
                  आपन योगदान दीं
                </CardTitle>
                <CardDescription className="text-amber-700 text-base">
                  आपके दिहल हर एक पईसा भोजपुरी भाषा के संरक्षण आ नया पीढ़ी तक पहुँचावे खातिर इस्तेमाल होई।
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-6">
                {/* Preset Amounts */}
                <div className="space-y-3">
                  <Label className="text-amber-900 text-lg">राशि चुनीं</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        className={`h-14 text-lg font-semibold ${
                          selectedAmount === amount 
                            ? "bg-amber-600 hover:bg-amber-700 text-white" 
                            : "border-amber-300 text-amber-800 hover:bg-amber-100"
                        }`}
                        onClick={() => handlePresetAmountClick(amount)}
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-3">
                  <Label htmlFor="customAmount" className="text-amber-900 text-lg">
                    कस्टम राशि लिखीं
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-amber-600" />
                    <Input
                      id="customAmount"
                      type="number"
                      placeholder="अपनी इच्छा के राशि लिखीं"
                      className="pl-10 h-12 text-lg border-amber-300 focus:border-amber-500"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-amber-900 text-lg">
                      पूरा नाम
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="आपन नाम लिखीं"
                      className="h-12 text-lg border-amber-300 focus:border-amber-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-amber-900 text-lg">
                      ईमेल
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="आपन ईमेल लिखीं"
                      className="h-12 text-lg border-amber-300 focus:border-amber-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full h-14 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold"
                  size="lg"
                >
                  Razorpay से सहयोग करें
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Membership Support Tab */}
          <TabsContent value="membership">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="text-center bg-green-50 rounded-t-lg">
                <CardTitle className="text-2xl text-green-900">
                  हमरे समुदाय से जुड़ीं
                </CardTitle>
                <CardDescription className="text-green-700 text-base">
                  भाषा के सबसे बड़ ताकत ओकरा बोले वाला लोग होलें। हमनी के WhatsApp समूह से जुड़ के एह अभियान के मजबूत बनाईं।
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-green-800 text-lg leading-relaxed text-center">
                    हमनी के ई प्रयास बा कि हर वर्ग, उम्र, आ क्षेत्र के भोजपुरी भाषी लोग एक साथ जुड़ें आ भोजपुरी के मान बढ़ावें। 
                    रउवा हमनी के WhatsApp परिवार के हिस्सा बन के आपन विचार साझा कर सकत बानी आ कार्यक्रम के जानकारी पा सकत बानी।
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
                  size="lg"
                  asChild
                >
                  <a 
                    href="https://chat.whatsapp.com/your-group-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                    WhatsApp पर हमरा साथे जुड़ीं
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <div className="mt-8 text-center text-amber-700">
          <p className="text-sm">
            गोरखपुरिया भोजपुरिया - भोजपुरी भाषा के संरक्षण आ संवर्धन खातिर समर्पित
          </p>
        </div>
      </div>
    </div>
  );
}