"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Sparkles, Box, Download } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-subtle to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass dark:glass-dark backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Building Design</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Design Buildings
              </span>
              <br />
              <span className="text-foreground">with Simple Text</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              No-code workflow builder for architects. Transform text prompts into 
              stunning 3D building concepts in seconds. Export ready-to-use models instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/workflow">
                <Button size="xl" className="group">
                  Start Building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="xl" variant="glass">
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { label: "Generation Time", value: "<30s" },
                { label: "Projects Created", value: "1000+" },
                { label: "Export Formats", value: "5+" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-foreground-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything You Need to
              <span className="text-primary"> Build Faster</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Powerful features designed for modern architects and designers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Fast",
                description: "Generate building concepts in under 30 seconds with Claude AI",
              },
              {
                icon: <Box className="w-6 h-6" />,
                title: "3D Visualization",
                description: "Real-time 3D preview with Three.js. Rotate, zoom, inspect every detail",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Multiple Exports",
                description: "Export to JSON, OBJ, IFC, and PNG. Ready for any workflow",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "AI-Powered",
                description: "Advanced AI understands architectural concepts and building codes",
              },
              {
                icon: <ArrowRight className="w-6 h-6" />,
                title: "Workflow Builder",
                description: "Visual drag-and-drop interface. Connect nodes, customize parameters",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Templates Library",
                description: "Pre-built workflows for common building types. Start in seconds",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card glass className="text-center p-12">
            <CardContent className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-foreground-muted">
                Join hundreds of architects using AI to accelerate their workflow
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/workflow">
                  <Button size="xl">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button size="xl" variant="outline">
                  View Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
