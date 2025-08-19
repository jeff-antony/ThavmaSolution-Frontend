import { useState } from "react";
import { ContactMessage, apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Send, 
  Eye,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactMessagesProps {
  messages: ContactMessage[];
  onMessagesUpdate: (messages: ContactMessage[]) => void;
}

const ContactMessages: React.FC<ContactMessagesProps> = ({ messages, onMessagesUpdate }) => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { toast } = useToast();

  const getStatusIcon = (status: ContactMessage['status']) => {
    switch (status) {
      case 'unread':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'read':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'responded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ContactMessage['status']) => {
    switch (status) {
      case 'unread':
        return 'bg-orange-100 text-orange-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsRead = async (message: ContactMessage) => {
    if (message.status === 'unread') {
      try {
        const updatedMessage = await apiService.updateMessageStatus(message._id || message.id, 'read');
        const messageIdString = String(message._id || message.id);
        onMessagesUpdate(messages.map(m => String(m._id || m.id) === messageIdString ? updatedMessage : m));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update message status",
          variant: "destructive",
        });
      }
    }
  };

  const handleRespond = async () => {
    if (!selectedMessage || !response.trim()) return;
    
    setLoading(true);
    setError("");

    try {
      await apiService.respondToMessage(selectedMessage._id || selectedMessage.id, response);
      
      // Update the message in the list
      const updatedMessage = {
        ...selectedMessage,
        status: 'responded' as const,
        response,
        respondedAt: new Date().toISOString()
      };
      
      const selectedIdString = String(selectedMessage._id || selectedMessage.id);
      onMessagesUpdate(messages.map(m => String(m._id || m.id) === selectedIdString ? updatedMessage : m));
      
      setSelectedMessage(null);
      setResponse("");
      
      toast({
        title: "Success",
        description: "Response sent successfully",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send response");
    } finally {
      setLoading(false);
    }
  };

  const sortedMessages = [...messages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedMessages.map((message) => (
        <Card 
          key={message._id || message.id} 
          className={`cursor-pointer transition-all hover:shadow-md ${
            message.status === 'unread' ? 'border-l-4 border-l-orange-500' : ''
          }`}
          onClick={() => {
            setSelectedMessage(message);
            handleMarkAsRead(message);
          }}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(message.status)}
                <CardTitle className="text-lg">{message.name}</CardTitle>
                <Badge className={getStatusColor(message.status)}>
                  {message.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(message.createdAt).toLocaleDateString()}
              </div>
            </div>
            <CardDescription className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{message.email}</span>
              </span>
              {message.phone && (
                <span className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>{message.phone}</span>
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {message.message}
            </p>
            {message.response && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Response:</p>
                <p className="text-sm">{message.response}</p>
                {message.respondedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Responded on {new Date(message.respondedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {messages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No contact messages yet</p>
          </CardContent>
        </Card>
      )}

      {/* Response Dialog */}
      {selectedMessage && (
        <Dialog open={true} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Respond to {selectedMessage.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Original Message:</h4>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{selectedMessage.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{selectedMessage.email}</span>
                    </span>
                    {selectedMessage.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{selectedMessage.phone}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Your Response:</h4>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedMessage(null)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRespond}
                  disabled={loading || !response.trim()}
                >
                  {loading ? "Sending..." : "Send Response"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContactMessages; 