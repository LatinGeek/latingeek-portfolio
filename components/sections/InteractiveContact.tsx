'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Send, Mail, MapPin, Phone, CheckCircle, 
  AlertCircle, Loader2, Sparkles, MessageSquare,
  User, Mail as MailIcon, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormField {
  id: keyof FormData;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  validation: (value: string) => string | null;
}

export default function InteractiveContact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [characterCount, setCharacterCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Form field configuration
  const formFields: FormField[] = [
    {
      id: 'name',
      label: t('name'),
      icon: <User className="w-4 h-4" />,
      type: 'text',
      placeholder: 'John Doe',
      validation: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return null;
      },
    },
    {
      id: 'email',
      label: t('email'),
      icon: <MailIcon className="w-4 h-4" />,
      type: 'email',
      placeholder: 'john@example.com',
      validation: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
      },
    },
    {
      id: 'message',
      label: t('message'),
      icon: <FileText className="w-4 h-4" />,
      type: 'textarea',
      placeholder: 'Tell me about your project...',
      validation: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return null;
      },
    },
  ];

  // Validate a single field
  const validateField = (fieldId: keyof FormData, value: string) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return null;
    return field.validation(value);
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    formFields.forEach(field => {
      const error = validateField(field.id, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (fieldId: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Update character count for message field
    if (fieldId === 'message') {
      setCharacterCount(value.length);
    }
    
    // Validate field if it has been touched
    if (touched[fieldId]) {
      const error = validateField(fieldId, value);
      setErrors(prev => ({
        ...prev,
        [fieldId]: error || undefined,
      }));
    }
  };

  // Handle blur (field touched)
  const handleBlur = (fieldId: keyof FormData) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    const error = validateField(fieldId, formData[fieldId]);
    setErrors(prev => ({
      ...prev,
      [fieldId]: error || undefined,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true,
    }), {} as Record<keyof FormData, boolean>);
    setTouched(allTouched);
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setCharacterCount(0);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      
      // Reset error after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('emailLabel'),
      value: 'contact@latingeek.dev',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      action: 'mailto:contact@latingeek.dev',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('location'),
      value: t('locationValue'),
      subValue: t('remote'),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('responseTime'),
      value: t('responseTimeValue'),
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ];

  // Form submission status animations
  const statusAnimations = {
    success: {
      initial: { scale: 0, rotate: -180 },
      animate: { scale: 1, rotate: 0 },
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    error: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section id="contact" className="section-anchor-offset py-24 sm:py-32 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">
                {t('workTogether')}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-cyan-400 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h2>
            
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Form card */}
              <Card
                variant="glass"
                className="border-white/10 backdrop-blur-lg"
                padding="lg"
              >
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Send className="w-6 h-6 text-primary-400" />
                    {t('sendMessage')}
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {formFields.map((field) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: formFields.indexOf(field) * 0.1 }}
                      >
                        <Input
                          id={field.id}
                          label={field.label}
                          leftIcon={field.icon}
                          value={formData[field.id]}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          onBlur={() => handleBlur(field.id)}
                          placeholder={field.placeholder}
                          variant={errors[field.id] ? 'error' : 'default'}
                          error={errors[field.id]}
                          type={field.type}
                          as={field.type === 'textarea' ? 'textarea' : 'input'}
                          rows={field.type === 'textarea' ? 4 : undefined}
                          className="backdrop-blur-sm"
                        />
                        
                        {/* Character counter for message field */}
                        {field.id === 'message' && (
                          <div className="flex justify-between items-center mt-2">
                            <span className={`text-xs ${
                              characterCount > 1000 ? 'text-error-500' : 'text-foreground/50'
                            }`}>
                              {characterCount}/1000 characters
                            </span>
                            {characterCount >= 10 && characterCount <= 1000 && (
                              <Badge variant="success" size="sm" className="ml-2">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Good length
                              </Badge>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Submit button with loading state */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="pt-4"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        variant="gradient"
                        className="w-full group"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        rightIcon={
                          !isSubmitting && (
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
                          )
                        }
                      >
                        {isSubmitting ? t('sending') : t('send')}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Form status messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        key="success"
                        {...statusAnimations.success}
                        className="mt-6 rounded-xl border border-success-500/20 bg-success-500/10 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-success-500" />
                          <div>
                            <p className="font-medium text-success-500">
                              {t('success')}
                            </p>
                            <p className="text-sm text-success-500/70 mt-1">
                              I typically respond within 24 hours.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        key="error"
                        {...statusAnimations.error}
                        className="mt-6 rounded-xl border border-error-500/20 bg-error-500/10 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-error-500" />
                          <div>
                            <p className="font-medium text-error-500">
                              {t('error')}
                            </p>
                            <p className="text-sm text-error-500/70 mt-1">
                              Please try again or email me directly.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Form validation tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6 rounded-xl glass border border-white/10 p-4"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Quick tips for best response:
                    </p>
                    <ul className="text-xs text-foreground/60 space-y-1">
                      <li>• Include project details and timeline</li>
                      <li>• Mention your budget range if applicable</li>
                      <li>• Let me know your preferred communication method</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Availability card */}
              <Card
                variant="gradient"
                className="border-primary-500/20"
                padding="lg"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    {t('availability')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-success-500 animate-pulse" />
                    <span className="font-medium text-success-500">
                      {t('available')}
                    </span>
                  </div>
                  
                  <p className="text-foreground/70">
                    {t('availabilityText')}
                  </p>
                  
                  <div className="pt-4">
                    <Badge variant="outline" className="mr-2">Web Development</Badge>
                    <Badge variant="outline" className="mr-2">Consulting</Badge>
                    <Badge variant="outline">Technical Leadership</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Contact details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card
                      variant="glass"
                      className="border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
                      padding="md"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${info.bgColor}`}>
                          <div className={info.color}>
                            {info.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h4>
                          
                          {info.action ? (
                            <a
                              href={info.action}
                              className={`${info.color} hover:underline transition-colors`}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className={info.color}>
                              {info.value}
                            </p>
                          )}
                          
                          {info.subValue && (
                            <p className="text-sm text-foreground/60 mt-1">
                              {info.subValue}
                            </p>
                          )}
                        </div>
                        
                        {info.action && (
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="text-foreground/40 group-hover:text-primary-400 transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Work process */}
              <Card
                variant="glass"
                className="border-white/10 backdrop-blur-sm"
                padding="lg"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">
                    My Work Process
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {[
                    { step: '01', title: 'Discovery', desc: 'Understand your project goals and requirements' },
                    { step: '02', title: 'Planning', desc: 'Create detailed project plan and timeline' },
                    { step: '03', title: 'Development', desc: 'Build with clean code and best practices' },
                    { step: '04', title: 'Delivery', desc: 'Thorough testing and deployment' },
                  ].map((process, index) => (
                    <motion.div
                      key={process.step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {process.step}
                        </span>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-foreground mb-1">
                          {process.title}
                        </h5>
                        <p className="text-sm text-foreground/60">
                          {process.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}