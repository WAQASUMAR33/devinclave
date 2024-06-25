"use client"
import { useState, useEffect } from 'react';

export default function FaqPage() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ comp_id: '', question: '', answer: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch('https://devinclave.vercel.app/api/faqs');
    const data = await res.json();
    setQuestions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`https://devinclave.vercel.app/api/faqs/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setEditId(null);
    } else {
      await fetch('api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ comp_id: '', question: '', answer: '' });
    fetchQuestions();
  };

  const handleEdit = (question) => {
    setFormData({ comp_id: question.comp_id, question: question.question, answer: question.answer });
    setEditId(question.id);
  };

  const handleDelete = async (id) => {
    await fetch(`https://devinclave.vercel.app/api/faqs/${id}`, {
      method: 'DELETE',
    });
    fetchQuestions();
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Question Management</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-gray-700">Comp ID</label>
          <input
            type="text"
            value={formData.comp_id}
            onChange={(e) => setFormData({ ...formData, comp_id: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Question</label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Answer</label>
          <input
            type="text"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {editId ? 'Update' : 'Add'} Question
        </button>
      </form>
      <input
        type="text"
        placeholder="Search questions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <ul>
        {filteredQuestions.map((question) => (
          <li key={question.id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <strong>Comp ID:</strong> {question.comp_id} <br />
                <strong>Question:</strong> {question.question} <br />
                <strong>Answer:</strong> {question.answer}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(question)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
