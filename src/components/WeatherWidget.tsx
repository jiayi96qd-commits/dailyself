'use client';

import { useState, useEffect } from 'react';

// 天气数据类型定义
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
}

// 天气组件
export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 从环境变量获取API密钥
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'BZGNEVWENEPY39MC8THQFK5L2';

  // 将坐标转换为城市名称的函数
  const getCityName = async (latitude: number, longitude: number): Promise<string> => {
    try {
      // 使用逆地理编码API获取城市名称
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`
      );
      
      if (!response.ok) {
        throw new Error('位置解析失败');
      }
      
      const data = await response.json();
      
      // 优先使用城市名称，如果没有则使用地区名称
      return data.city || data.locality || data.principalSubdivision || '未知位置';
    } catch (err) {
      console.error('位置解析错误:', err);
      return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }
  };

  // 获取天气数据的函数
  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${API_KEY}&unitGroup=metric&include=current`
      );
      
      if (!response.ok) {
        throw new Error('天气数据获取失败');
      }
      
      const data = await response.json();
      
      // 获取城市名称
      const cityName = await getCityName(latitude, longitude);
      
      // 提取需要的天气信息
      const current = data.currentConditions;
      setWeather({
        location: cityName,
        temperature: Math.round(current.temp),
        condition: current.conditions,
        humidity: current.humidity
      });
      
    } catch (err) {
      setError('无法获取天气信息');
      console.error('天气API错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 获取用户位置
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('位置获取失败:', error);
          setError('无法获取位置信息');
          setLoading(false);
        }
      );
    } else {
      setError('浏览器不支持地理位置功能');
      setLoading(false);
    }
  };

  // 组件加载时获取位置和天气
  useEffect(() => {
    getLocation();
  }, []);

  // 加载状态
  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-sm text-gray-600">获取天气信息中...</span>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-600">{error}</p>
        <button 
          onClick={getLocation}
          className="mt-2 text-xs text-red-500 hover:text-red-700 underline"
        >
          重试
        </button>
      </div>
    );
  }

  // 正常显示天气信息
  if (!weather) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">📍</span>
            {weather.location}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            {weather.temperature}°C
          </p>
          <p className="text-sm text-gray-600">
            {weather.condition}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            湿度: {weather.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
}
