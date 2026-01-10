/**
 * Slider 滑块组件
 * 使用设计系统 CSS 变量
 */

'use client';

import { useState, useRef, useEffect } from 'react';

export interface SliderProps {
  label?: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  unit?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
}

export function Slider({
  label,
  min,
  max,
  value,
  onChange,
  step = 1,
  unit = '',
  description,
  disabled = false,
  className = '',
  showValue = true,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const trackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 同步外部 value 变化
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 计算滑块位置百分比
  const percentage = ((localValue - min) / (max - min)) * 100;

  // 处理滑块移动
  const handleMove = (clientX: number) => {
    if (!trackRef.current || disabled) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const rawValue = percentage * (max - min) + min;

    // 根据 step 取整
    const steppedValue = Math.round(rawValue / step) * step;
    const newValue = Math.max(min, Math.min(max, steppedValue));

    setLocalValue(newValue);
    onChange(newValue);
  };

  // 鼠标/触摸事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || !isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, min, max, step, disabled]);

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // 生成刻度标记
  const marks = [];
  const markCount = Math.min((max - min) / step, 10); // 最多显示10个刻度
  const markStep = markCount > 1 ? (max - min) / (markCount - 1) : 0;

  for (let i = 0; i < markCount; i++) {
    const markValue = min + markStep * i;
    marks.push(markValue);
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              {label}
            </label>
          )}
          {showValue && (
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                {localValue}
              </span>
              {unit && (
                <span className="text-sm text-[var(--text-muted)]">{unit}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* 滑块容器 */}
      <div
        ref={trackRef}
        className={`
          relative h-2 rounded-full cursor-pointer select-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{
          backgroundColor: 'var(--background-tertiary)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* 进度条 */}
        <div
          className="absolute h-full rounded-full transition-all duration-150"
          style={{
            width: `${percentage}%`,
            background: 'var(--gradient-primary)',
          }}
        />

        {/* 刻度标记 */}
        {marks.map((mark) => {
          const markPercentage = ((mark - min) / (max - min)) * 100;
          return (
            <div
              key={mark}
              className="absolute top-1/2 -translate-y-1/2 w-0.5 rounded-full"
              style={{
                left: `${markPercentage}%`,
                height: mark <= localValue ? '100%' : '50%',
                backgroundColor:
                  mark <= localValue
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'var(--border-subtle)',
              }}
            />
          );
        })}

        {/* 滑块 */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
            transition-shadow duration-150
            ${isDragging ? 'scale-110' : 'hover:scale-105'}
            ${disabled ? '' : 'cursor-grab active:cursor-grabbing'}
          `}
          style={{
            left: `calc(${percentage}% - 10px)`,
            backgroundColor: 'var(--background-primary)',
            border: '2px solid var(--color-brand)',
            boxShadow: isDragging
              ? 'var(--shadow-glow-brand)'
              : 'var(--shadow-md)',
            transition: 'all 0.15s ease',
          }}
        />
      </div>

      {/* 描述文本 */}
      {description && (
        <p className="text-sm text-[var(--text-muted)]">{description}</p>
      )}

      {/* 最小/最大值标签 */}
      <div className="flex justify-between text-xs text-[var(--text-muted)]">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

/**
 * RangeSlider 双滑块组件（范围选择）
 */
export interface RangeSliderProps {
  label?: string;
  min: number;
  max: number;
  values: [number, number]; // [minValue, maxValue]
  onChange: (values: [number, number]) => void;
  step?: number;
  unit?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function RangeSlider({
  label,
  min,
  max,
  values,
  onChange,
  step = 1,
  unit = '',
  description,
  disabled = false,
  className = '',
}: RangeSliderProps) {
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const [localValues, setLocalValues] = useState(values);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleMove = (clientX: number, isMin: boolean) => {
    if (!trackRef.current || disabled) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const rawValue = percentage * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    const newValue = Math.max(min, Math.min(max, steppedValue));

    setLocalValues((prev) => {
      let newValues: [number, number];

      if (isMin) {
        newValues = [Math.min(newValue, prev[1] - step), prev[1]];
      } else {
        newValues = [prev[0], Math.max(newValue, prev[0] + step)];
      }

      onChange(newValues);
      return newValues;
    });
  };

  const minPercentage = ((localValues[0] - min) / (max - min)) * 100;
  const maxPercentage = ((localValues[1] - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--text-secondary)]">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {localValues[0]}{unit}
            </span>
            <span className="text-[var(--text-muted)]">-</span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {localValues[1]}{unit}
            </span>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className={`
          relative h-2 rounded-full cursor-pointer select-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{
          backgroundColor: 'var(--background-tertiary)',
        }}
      >
        {/* 进度条 */}
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
            background: 'var(--gradient-primary)',
          }}
        />

        {/* 最小值滑块 */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
            transition-shadow duration-150
            ${isDraggingMin ? 'scale-110' : 'hover:scale-105'}
            ${disabled ? '' : 'cursor-grab active:cursor-grabbing'}
          `}
          style={{
            left: `calc(${minPercentage}% - 10px)`,
            backgroundColor: 'var(--background-primary)',
            border: '2px solid var(--color-brand)',
            boxShadow: isDraggingMin
              ? 'var(--shadow-glow-brand)'
              : 'var(--shadow-md)',
          }}
          onMouseDown={(e) => {
            if (disabled) return;
            setIsDraggingMin(true);
            handleMove(e.clientX, true);
          }}
        />

        {/* 最大值滑块 */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
            transition-shadow duration-150
            ${isDraggingMax ? 'scale-110' : 'hover:scale-105'}
            ${disabled ? '' : 'cursor-grab active:cursor-grabbing'}
          `}
          style={{
            left: `calc(${maxPercentage}% - 10px)`,
            backgroundColor: 'var(--background-primary)',
            border: '2px solid var(--color-brand)',
            boxShadow: isDraggingMax
              ? 'var(--shadow-glow-brand)'
              : 'var(--shadow-md)',
          }}
          onMouseDown={(e) => {
            if (disabled) return;
            setIsDraggingMax(true);
            handleMove(e.clientX, false);
          }}
        />
      </div>

      {description && (
        <p className="text-sm text-[var(--text-muted)]">{description}</p>
      )}
    </div>
  );
}
