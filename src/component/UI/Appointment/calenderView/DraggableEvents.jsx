import { useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction";

const DraggableEvents = () => {
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");

        return {
          title: title,
          id: id,
        };
      },
    });
  }, []);

  return (
    <div id="external-events">
      <p>
        <strong>Draggable Events</strong>
      </p>
      <div className="fc-event" title="My Event 1" data="1">
        My Event 1
      </div>
      <div className="fc-event" title="My Event 2" data="2">
        My Event 2
      </div>
      <div className="fc-event" title="My Event 3" data="3">
        My Event 3
      </div>
      <div className="fc-event" title="My Event 4" data="4">
        My Event 4
      </div>
      <div className="fc-event" title="My Event 5" data="5">
        My Event 5
      </div>
    </div>
  );
};

export default DraggableEvents;
