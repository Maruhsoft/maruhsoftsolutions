'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import skillsData from '@/data/skills.json';

export default function SkillsShowcase() {
  const [activeTab, setActiveTab] = useState(skillsData[0].category);

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <TabsList className="h-auto flex flex-wrap justify-center gap-2">
          {skillsData.map((category) => (
            <TabsTrigger
              key={category.category}
              value={category.category}
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.category}
            </TabsTrigger>
          ))}
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
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{skill.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}