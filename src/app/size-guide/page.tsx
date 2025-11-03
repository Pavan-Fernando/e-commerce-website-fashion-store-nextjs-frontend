"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ruler, Shirt, Download, Info } from "lucide-react";

export default function SizeGuidePage() {
    // Size data (US, EU, UK, Chest, Waist, Hips in inches)
    const womenSizes = [
        { us: "XS", eu: "32", uk: "4", chest: "31-32", waist: "23-24", hips: "33-34" },
        { us: "S", eu: "34-36", uk: "6-8", chest: "33-34", waist: "25-26", hips: "35-36" },
        { us: "M", eu: "38-40", uk: "10-12", chest: "35-37", waist: "27-29", hips: "37-39" },
        { us: "L", eu: "42-44", uk: "14-16", chest: "38-40", waist: "30-32", hips: "40-42" },
        { us: "XL", eu: "46", uk: "18", chest: "41-43", waist: "33-35", hips: "43-45" },
    ];

    const menSizes = [
        { us: "XS", eu: "44", uk: "34", chest: "34-36", waist: "28-30" },
        { us: "S", eu: "46", uk: "36", chest: "36-38", waist: "30-32" },
        { us: "M", eu: "48-50", uk: "38-40", chest: "38-40", waist: "32-34" },
        { us: "L", eu: "52-54", uk: "42-44", chest: "41-43", waist: "35-37" },
        { us: "XL", eu: "56", uk: "46", chest: "44-46", waist: "38-40" },
    ];

    const kidsSizes = [
        { age: "2-3Y", height: "34-37", chest: "20-21", waist: "19-20" },
        { age: "4-5Y", height: "38-41", chest: "21-22", waist: "20-21" },
        { age: "6-7Y", height: "42-47", chest: "23-24", waist: "21-22" },
        { age: "8-9Y", height: "48-52", chest: "25-26", waist: "22-23" },
        { age: "10-11Y", height: "53-57", chest: "27-29", waist: "24-25" },
    ];

    const howToMeasure = [
        { icon: Shirt, title: "Chest", desc: "Measure under arms around the fullest part of the chest." },
        { icon: Ruler, title: "Waist", desc: "Measure around the natural waistline." },
        { icon: Ruler, title: "Hips", desc: "Measure around the fullest part of the hips." },
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                    Size Guide
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find your perfect fit with our detailed size charts and measurement tips.
                </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="women" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="women">Women</TabsTrigger>
                    <TabsTrigger value="men">Men</TabsTrigger>
                    <TabsTrigger value="kids">Kids</TabsTrigger>
                </TabsList>

                {/* Women */}
                <TabsContent value="women">
                    <Card>
                        <CardHeader>
                            <CardTitle>Women's Size Chart</CardTitle>
                            <CardDescription>All measurements in inches</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>US</TableHead>
                                            <TableHead>EU</TableHead>
                                            <TableHead>UK</TableHead>
                                            <TableHead>Chest</TableHead>
                                            <TableHead>Waist</TableHead>
                                            <TableHead>Hips</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {womenSizes.map((size) => (
                                            <TableRow key={size.us}>
                                                <TableCell className="font-medium">{size.us}</TableCell>
                                                <TableCell>{size.eu}</TableCell>
                                                <TableCell>{size.uk}</TableCell>
                                                <TableCell>{size.chest}</TableCell>
                                                <TableCell>{size.waist}</TableCell>
                                                <TableCell>{size.hips}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Men */}
                <TabsContent value="men">
                    <Card>
                        <CardHeader>
                            <CardTitle>Men's Size Chart</CardTitle>
                            <CardDescription>All measurements in inches</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>US</TableHead>
                                            <TableHead>EU</TableHead>
                                            <TableHead>UK</TableHead>
                                            <TableHead>Chest</TableHead>
                                            <TableHead>Waist</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {menSizes.map((size) => (
                                            <TableRow key={size.us}>
                                                <TableCell className="font-medium">{size.us}</TableCell>
                                                <TableCell>{size.eu}</TableCell>
                                                <TableCell>{size.uk}</TableCell>
                                                <TableCell>{size.chest}</TableCell>
                                                <TableCell>{size.waist}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Kids */}
                <TabsContent value="kids">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kids' Size Chart</CardTitle>
                            <CardDescription>Height and measurements in inches</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Age</TableHead>
                                            <TableHead>Height</TableHead>
                                            <TableHead>Chest</TableHead>
                                            <TableHead>Waist</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {kidsSizes.map((size) => (
                                            <TableRow key={size.age}>
                                                <TableCell className="font-medium">{size.age}</TableCell>
                                                <TableCell>{size.height}</TableCell>
                                                <TableCell>{size.chest}</TableCell>
                                                <TableCell>{size.waist}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* How to Measure */}
            <section className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-8">How to Measure</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {howToMeasure.map((item, i) => (
                        <Card key={i} className="text-center p-6 hover:shadow-md transition-shadow">
                            <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Tips */}
            <section className="mt-12 bg-muted/50 rounded-2xl p-8">
                <div className="flex items-start gap-3 max-w-3xl mx-auto">
                    <Info className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold mb-2">Pro Tips</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Use a soft measuring tape for accurate results.</li>
                            <li>• Measure over bare skin or light clothing.</li>
                            <li>• If between sizes, go up for a relaxed fit.</li>
                            <li>• Check product page for specific fit notes.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="mt-12 text-center">
                <Button size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    Download PDF Guide
                </Button>
            </div>
        </div>
    );
}