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
          <TabsList className="h-auto p-2 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-2xl">
            {skillsData.map((category) => {
              const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code;
              return (
                <TabsTrigger
                  key={category.category}
                  value={category.category}
                  className="px-6 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2 text-sm font-medium"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group"
                >
                  <div className="glass-effect p-6 rounded-2xl card-hover h-full flex flex-col items-center text-center space-y-3 group-hover:border-primary/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <div className="w-6 h-6 rounded-md bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="text-xs px-3 py-1 bg-muted/50 hover:bg-muted/70 transition-colors duration-300"
                    >
                      Proficient
                    </Badge>
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