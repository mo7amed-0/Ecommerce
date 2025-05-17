import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "الموضوع مطلوب";
    }
    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send the form data to your backend
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus(""), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">اتصل بنا</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#5141E4FF] mb-4">
              معلومات الاتصال
            </h2>
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <span className="font-semibold">العنوان:</span>
                <span>123 شارع التسوق، مدينة التجارة الإلكترونية</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">البريد الإلكتروني:</span>
                <span>info@shopease.com</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">الهاتف:</span>
                <span>+1 234 567 890</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#5141E4FF] mb-4">
              ساعات العمل
            </h2>
            <div className="space-y-2">
              <p>السبت - الخميس: 9:00 صباحاً - 6:00 مساءً</p>
              <p>الجمعة: مغلق</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#5141E4FF] mb-4">
            أرسل لنا رسالة
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5141E4FF]"
                placeholder="أدخل اسمك"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5141E4FF]"
                placeholder="أدخل بريدك الإلكتروني"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5141E4FF]"
                placeholder="أدخل موضوع الرسالة"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5141E4FF] h-32"
                placeholder="اكتب رسالتك هنا"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#5141E4FF] text-white px-4 py-3 rounded-lg hover:bg-[#4334D4FF] transition-colors"
            >
              إرسال الرسالة
            </button>

            {submitStatus === "success" && (
              <p className="text-green-500 text-center">
                تم إرسال رسالتك بنجاح!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
