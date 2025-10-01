import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { PoCStep } from '../../types';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface PoCStepsBuilderProps {
  steps: PoCStep[];
  onChange: (steps: PoCStep[]) => void;
}

export function PoCStepsBuilder({ steps, onChange }: PoCStepsBuilderProps) {
  const addStep = () => {
    const newStep: PoCStep = {
      id: `step-${Date.now()}`,
      title: '',
      description: '',
      images: [],
    };
    onChange([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    onChange(steps.filter((step) => step.id !== id));
  };

  const updateStep = (id: string, updates: Partial<PoCStep>) => {
    onChange(
      steps.map((step) =>
        step.id === id ? { ...step, ...updates } : step
      )
    );
  };

  return (
    <div className="space-y-4 mt-2">
      {steps.map((step, index) => (
        <StepCard
          key={step.id}
          step={step}
          index={index}
          onUpdate={(updates) => updateStep(step.id, updates)}
          onRemove={() => removeStep(step.id)}
        />
      ))}

      <Button type="button" variant="outline" onClick={addStep} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add PoC Step
      </Button>

      {steps.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No steps added yet. Click the button above to add your first step.
        </p>
      )}
    </div>
  );
}

interface StepCardProps {
  step: PoCStep;
  index: number;
  onUpdate: (updates: Partial<PoCStep>) => void;
  onRemove: () => void;
}

function StepCard({ step, index, onUpdate, onRemove }: StepCardProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    // Convert files to data URLs for preview
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onUpdate({ images: [...step.images, dataUrl] });
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    multiple: true,
  });

  const removeImage = (imageIndex: number) => {
    onUpdate({
      images: step.images.filter((_, i) => i !== imageIndex),
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {index + 1}
            </span>
            <span className="text-sm text-muted-foreground">Step {index + 1}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <Input
              placeholder="Step title..."
              value={step.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </div>

          <div>
            <Textarea
              placeholder="Step description..."
              value={step.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isDragActive
                  ? 'Drop images here...'
                  : 'Drag & drop images, or click to select'}
              </p>
            </div>

            {/* Image Previews */}
            {step.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                {step.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative group">
                    <img
                      src={img}
                      alt={`Step ${index + 1} screenshot ${imgIndex + 1}`}
                      className="rounded border w-full h-24 object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(imgIndex)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
