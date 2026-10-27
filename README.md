# 💈 Barbearia WALBABER - Sistema de Agendamento & Painel Master

Um site moderno, elegante e responsivo de barbearia com **separação completa entre Usuário Master (Dono) e Usuário Cliente (Público)**.

---

## 👑 Modo Usuário Master vs 👤 Modo Usuário Cliente

### 👤 1. Modo Cliente (Público Geral)
O cliente acessa o site e só tem permissão para:
- Conhecer os serviços, valores e a equipe de barbeiros.
- Realizar agendamentos através do assistente em 4 passos.
- Receber o comprovante (Ticket) e enviar a confirmação pronta pelo WhatsApp.
- Consultar e cancelar apenas os seus próprios agendamentos salvos através do botão **"Meus Horários"**.

---

### 👑 2. Modo Master (Proprietário da Barbearia)
O proprietário clica no botão **`[👑 Master]`** no menu superior e entra com sua senha:
* **Senha padrão inicial:** `walbaber2026` *(pode ser alterada dentro do painel)*

Dentro da **Central Master**, o dono pode:
1. **📅 Gerenciar Todos os Agendamentos:**
   - Visualizar todos os clientes que agendaram com data, horário, serviços e valor total.
   - Alterar o status do agendamento (*Confirmado, Pendente, Concluído, Cancelado*).
   - Chamar o cliente diretamente no WhatsApp com uma mensagem de confirmação em 1 clique.
   - Acompanhar o faturamento total estimado e métricas em tempo real.
2. **⏰ Gerenciar Horários de Atendimento:**
   - Adicionar novos horários livres com um seletor de hora.
   - Excluir horários que não quer disponibilizar.
   - Restaurar horários padrão a qualquer momento.
3. **✂️ Gerenciar Serviços & Preços:**
   - Cadastrar novos serviços com categoria, preço e duração.
   - Editar os preços dos serviços existentes em tempo real.
   - Excluir serviços do catálogo.
4. **💈 Gerenciar Barbeiros:**
   - Cadastrar novos profissionais da equipe com especialidade e foto.
   - Remover barbeiros.
5. **⚙️ Configurações Gerais & Senha:**
   - Alterar o nome da barbearia.
   - Alterar o WhatsApp oficial de agendamentos (`5522992653627`).
   - Alterar o endereço físico (`Rua Recife, 1071, Casa 4 - Rio das Ostras - RJ`).
   - Trocar a senha do Usuário Master.
   - Botão para resetar todos os dados para o padrão de fábrica se desejar.

> **Tudo é salvo instantaneamente:** Qualquer alteração feita pelo Master é gravada no navegador (`LocalStorage`) e reflete imediatamente para os clientes!

---

## 🚀 Como abrir e rodar no Visual Studio Code (VS Code)

### Passo 1: Abrir a pasta no VS Code
1. Abra o seu **Visual Studio Code**.
2. Clique no menu superior em **File (Arquivo)** > **Open Folder... (Abrir Pasta...)**.
3. Navegue até o caminho:
   ```
   C:\Users\WESLEY\.gemini\antigravity\scratch\barbearia-agendamento
   ```
4. Clique em **Selecionar Pasta**.

---

### Passo 2: Executar no navegador
1. No VS Code, instale a extensão **Live Server** (`Ctrl + Shift + X` > pesquise por *Live Server*).
2. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
3. O site abrirá no navegador pronto para uso!
*(Ou dê um duplo clique no arquivo `index.html` pelo Windows Explorer).*

---

Feito com excelência para a Barbearia WALBABER! ✂️🔥
