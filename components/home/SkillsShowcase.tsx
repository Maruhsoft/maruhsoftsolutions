'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Smartphone, Cloud, Palette, Wrench } from 'lucide-react';
import skillsData from '@/data/skills.json';

const categoryIcons = {
  'Frontend Development': Code,
  'Backend Development': Wrench,
  'Mobile Development': Smartphone,
  'DevOps & Cloud': Cloud,
  'Other Skills': Palette,
};

export default function SkillsShowcase() {
  const [activeTab, setActiveTab] = useState(skillsData[0].category);

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="h-auto p-1.5 bg-muted/30 backdrop-blur-sm border border-border/50 rounded-xl">
            {skillsData.map((category) => {
              const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code;
              return (
                <TabsTrigger
                  key={category.category}
                  value={category.category}
                  className="px-4 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.category}</span>
                  <span className="sm:hidden">{category.category.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {skillsData.map((category) => (
          <TabsContent
            key={category.category}
            value={category.category}
            className="mt-0 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group"
                >
                  <div className="bg-card border border-border/50 p-4 rounded-lg hover:border-primary/20 transition-all duration-300 h-full flex flex-col items-center text-center space-y-2 group-hover:shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300">
                      <div className="w-4 h-4 rounded bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300" />
                    </div>
                    <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {skill.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}