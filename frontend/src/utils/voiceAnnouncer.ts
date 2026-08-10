export function announceQueueCall(ticketNumber: string, roomNumber: string, wing?: string, lang: 'en' | 'es' = 'en') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const messageText = lang === 'es'
    ? `Ticket ${ticketNumber.split('').join(' ')}, por favor diríjase a la sala ${roomNumber}.`
    : `Attention. Ticket ${ticketNumber.split('').join(' ')}, please proceed to Room ${roomNumber}, ${wing || 'Consultation Wing'}.`;

  const utterance = new SpeechSynthesisUtterance(messageText);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';

  window.speechSynthesis.speak(utterance);
}
