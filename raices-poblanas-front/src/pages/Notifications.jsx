import { Bell, MessageSquare } from 'lucide-react';

const Notifications = () => {
  const alerts = [
    { id: 1, title: "¡Venta Realizada!", msg: "Han comprado tu 'Jarrón de Barro'", time: "Hace 5 min", type: "sale" },
    { id: 2, title: "Nuevo Mensaje", msg: "Un cliente pregunta por el stock de rebozos.", time: "Hace 1 hora", type: "msg" }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="font-serif text-3xl text-raices-brown font-bold mb-8">Centro de Notificaciones</h2>
      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-raices-green flex gap-4 items-start">
            <div className="bg-slate-50 p-3 rounded-xl text-raices-brown">
              {a.type === 'sale' ? <Bell size={24}/> : <MessageSquare size={24}/>}
            </div>
            <div>
              <h4 className="font-bold text-raices-brown">{a.title}</h4>
              <p className="text-slate-500 text-sm">{a.msg}</p>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;