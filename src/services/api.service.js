import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL || 'https://api.mdstore.dz/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // إضافة Interceptors لمعالجة التوكين والأخطاء تلقائياً
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // --- عمليات CRUD الأساسية ---

  // GET: جلب البيانات
  async getAll(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // GET BY ID: جلب عنصر واحد
  async getOne(endpoint, id) {
    try {
      const response = await this.api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST: إضافة عنصر جديد
  async create(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PUT: تحديث عنصر بالكامل
  async update(endpoint, id, data) {
    try {
      const response = await this.api.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE: حذف عنصر
  async delete(endpoint, id) {
    try {
      const response = await this.api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // معالجة الأخطاء بشكل موحد
  handleError(error) {
    const message = error.response?.data?.message || 'حدث خطأ غير متوقع';
    // يمكنك هنا إضافة Toast notification
    console.error('API Error:', message);
    throw error;
  }
}

export default new ApiService();